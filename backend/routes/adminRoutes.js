const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Route d'inscription admin
router.post('/register', adminController.register);

// Route de vérification du code
router.post('/verify', adminController.verifyCode);

// Route de connexion admin
router.post('/login', adminController.login);

// Route protégée pour obtenir le profil admin
router.get('/profile', auth, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'verificationCode'] }
    });
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin non trouvé'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router; 