const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental'); // Adjust path as needed

// Get count of active rentals
router.get('/active', async (req, res) => {
  try {
    const count = await Rental.countDocuments({ status: 'active' });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active rentals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 