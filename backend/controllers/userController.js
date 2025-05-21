const { User, Booking } = require('../models'); // Assurez-vous que votre index de models exporte { User }
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Admin } = require('../models');

// Transporteur Nodemailer avec acceptation des certificats auto-signés
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'fbouazi3@gmail.com',
    pass: 'rgzfplsukpdhtohr'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Stockage temporaire des codes de vérification
const verificationCodes = new Map();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Find user with associated bookings
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Booking,
        attributes: ['id', 'status', 'start_date', 'end_date', 'total_price']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate booking statistics
    const bookings = user.Bookings || [];
    const bookingStats = {
      total_bookings: bookings.length,
      active_bookings: bookings.filter(b => b.status === 'approved').length,
      pending_bookings: bookings.filter(b => b.status === 'pending').length,
      completed_bookings: bookings.filter(b => b.status === 'completed').length,
      cancelled_bookings: bookings.filter(b => b.status === 'cancelled').length,
      total_spent: bookings.reduce((sum, b) => {
        // Use total_price if available, otherwise return current sum
        const price = b.total_price ? parseFloat(b.total_price) : 0;
        return sum + price;
      }, 0)
    };

    // Add some debug logging
    console.log('User bookings:', bookings.map(b => ({
      id: b.id,
      status: b.status,
      total_price: b.total_price
    })));
    console.log('Booking stats:', bookingStats);

    // Combine user data with booking stats
    const userData = {
      ...user.toJSON(),
      ...bookingStats
    };

    // Remove the Bookings array from the response to keep it clean
    delete userData.Bookings;

    res.json(userData);
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Nouvelle inscription avec vérification par email
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    // Générer un code de vérification
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    verificationCodes.set(email, {
      code: verificationCode,
      data: { ...req.body, password },
      timestamp: Date.now()
    });
    // Envoyer l'email avec le code
    await transporter.sendMail({
      from: 'fbouazi3@gmail.com',
      to: email,
      subject: 'Code de vérification - Inscription Utilisateur',
      html: `
        <h1>Bienvenue !</h1>
        <p>Votre code de vérification est : <strong>${verificationCode}</strong></p>
        <p>Ce code expirera dans 10 minutes.</p>
      `
    });
    res.status(200).json({ message: 'Code de vérification envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du code de vérification' });
  }
};

// Vérification du code et création de l'utilisateur
exports.verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;
    const verificationData = verificationCodes.get(email);
    if (!verificationData) {
      return res.status(400).json({ message: 'Code de vérification expiré ou invalide' });
    }
    // Vérifier si le code a expiré (10 minutes)
    if (Date.now() - verificationData.timestamp > 10 * 60 * 1000) {
      verificationCodes.delete(email);
      return res.status(400).json({ message: 'Code de vérification expiré' });
    }
    // Vérifier le code
    if (verificationData.code !== code) {
      return res.status(400).json({ message: 'Code de vérification incorrect' });
    }
    // Créer l'utilisateur
    const hashedPassword = await bcrypt.hash(verificationData.data.password, 10);
    const user = await User.create({
      ...verificationData.data,
      password: hashedPassword,
      status: 'active'
    });
    verificationCodes.delete(email);
    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier d'abord si c'est un admin
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: admin.id, role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.json({
          success: true,
          user: {
            id: admin.id,
            name: admin.nom,
            email: admin.email,
            role: 'admin',
            locationName: admin.nom_location
          },
          token
        });
      }
    }

    // Si ce n'est pas un admin, vérifier si c'est un utilisateur normal
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { id: user.id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'user'
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Générer un code aléatoire à 6 chiffres
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Code valable 15 minutes
    const resetCodeExpiration = new Date(Date.now() + 15 * 60000);

    user.resetCode = resetCode;
    user.resetCodeExpiration = resetCodeExpiration;
    await user.save();

    // Configurer nodemailer (adaptez à votre fournisseur SMTP)
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, // smtp.gmail.com
        port: process.env.MAIL_PORT, // 587
        secure: false, // true pour 465, false pour les autres ports
        auth: {
          user: process.env.MAIL_USERNAME, // info@refoodonline.com
          pass: process.env.MAIL_PASSWORD  // sltwwchptbltinaw
        },
        tls: {
          ciphers: 'SSLv3'
        }
      });
      

    await transporter.sendMail({
      from: '"Support" ',
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      text: `Votre code de réinitialisation est : ${resetCode}. Il expire dans 15 minutes.`
    });

    return res.json({
      success: true,
      message: "Code envoyé à votre email"
    });
  } catch (error) {
    console.error("Erreur forgotPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du code"
    });
  }
};
exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé"
        });
      }
      
      console.log("Code envoyé :", user.resetCode);
      console.log("Code fourni :", code);
      console.log("Expiration :", user.resetCodeExpiration);
      console.log("Date actuelle :", new Date());
  
      if (user.resetCode !== code || new Date() > new Date(user.resetCodeExpiration)) {
        return res.status(400).json({
          success: false,
          message: "Code invalide ou expiré"
        });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetCode = null;
      user.resetCodeExpiration = null;
      await user.save();
  
      return res.json({
        success: true,
        message: "Mot de passe réinitialisé avec succès"
      });
    } catch (error) {
      console.error("Erreur resetPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la réinitialisation du mot de passe"
      });
    }
  };
  exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé"
        });
      }
  
      // Vérifier que le code est correct et non expiré
      if (user.resetCode !== code || new Date() > new Date(user.resetCodeExpiration)) {
        return res.status(400).json({
          success: false,
          message: "Code invalide ou expiré"
        });
      }
  
      return res.json({
        success: true,
        message: "Code vérifié. Vous pouvez réinitialiser votre mot de passe."
      });
    } catch (error) {
      console.error("Erreur verifyCode:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la vérification du code"
      });
    }
  };
    exports.changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Ancien mot de passe incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ success: true, message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("changePassword error:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
