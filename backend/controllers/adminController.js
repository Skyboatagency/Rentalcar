const { Admin } = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Générer un code de vérification
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Enregistrement d'un admin
exports.register = async (req, res) => {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Un administrateur existe déjà dans le système'
      });
    }

    const {
      nom,
      prenom,
      nomLocation,
      adresse,
      telephone,
      email,
      ville,
      password
    } = req.body;

    // Générer le code de vérification
    const verificationCode = generateVerificationCode();

    // Créer l'admin
    const admin = await Admin.create({
      nom,
      prenom,
      nomLocation,
      adresse,
      telephone,
      email,
      ville,
      password,
      verificationCode
    });

    // Envoyer l'email de vérification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Code de vérification',
      text: `Votre code de vérification est : ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie. Veuillez vérifier votre email.',
      tempUserId: admin.id
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    });
  }
};

// Vérification du code
exports.verifyCode = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const admin = await Admin.findOne({
      where: {
        id: userId,
        verificationCode: code
      }
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Code de vérification invalide'
      });
    }

    // Mettre à jour l'admin comme vérifié
    admin.isVerified = true;
    admin.verificationCode = null;
    await admin.save();

    // Générer le token JWT
    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Compte vérifié avec succès',
      token,
      user: {
        id: admin.id,
        nom: admin.nom,
        prenom: admin.prenom,
        email: admin.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification'
    });
  }
};

// Connexion admin
exports.login = async (req, res) => {
  try {
    const { nom, password } = req.body;

    // Trouver l'admin
    const admin = await Admin.findOne({ where: { nom } });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Nom ou mot de passe incorrect'
      });
    }

    // Vérifier si le compte est vérifié
    if (!admin.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Veuillez vérifier votre compte avant de vous connecter'
      });
    }

    // Vérifier le mot de passe
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Nom ou mot de passe incorrect'
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: admin.id,
        nom: admin.nom,
        prenom: admin.prenom,
        email: admin.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    });
  }
}; 