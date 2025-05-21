const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Validation middleware
const validateBookingData = (req, res, next) => {
  const requiredFields = [
    'user_id',
    'car_id',
    'start_date',
    'end_date',
    'total_price',
    'locataire1',
    'adresse1',
    'cin1',
    'permis1'
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  next();
};

// Route pour récupérer toutes les réservations
router.get('/', bookingController.getAllBookings);

// Route pour récupérer une réservation par ID
router.get('/:id', bookingController.getBookingById);

// Route pour créer une réservation
router.post('/', validateBookingData, bookingController.createBooking);

// Route pour mettre à jour une réservation
router.put('/:id', validateBookingData, bookingController.updateBooking);

// Route pour supprimer une réservation
router.delete('/:id', bookingController.deleteBooking);

// Route pour récupérer les réservations d'un utilisateur avec les voitures et les commentaires
router.get('/user/:userId/with-cars-feedbacks', bookingController.getBookingsWithCarsAndFeedbacks);

module.exports = router;
