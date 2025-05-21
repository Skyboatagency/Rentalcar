const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User'); // Adjust path as needed

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/verify', userController.verifyUser);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/verify-code', userController.verifyCode);
router.put('/change-password', userController.changePassword);

// Get count of active users
router.get('/active', async (req, res) => {
  try {
    // Define what "active" means for your application
    // For example, users who have accounts in the system
    const count = await User.countDocuments();
    
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
