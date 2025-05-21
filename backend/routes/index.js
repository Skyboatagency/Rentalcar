const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');

// Routes pour les admins
router.use('/admins', adminRoutes);

module.exports = router; 