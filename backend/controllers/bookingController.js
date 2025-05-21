const { Booking, Car, Feedback } = require('../models');
const { User } = require('../models');

// Exemple dans bookingController.js
module.exports = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          { model: Car },
          { model: Feedback, as: 'Feedback', required: false },
          { model: User }
        ]
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findByPk(req.params.id, {
        include: [
          { model: Car },
          { model: Feedback, as: 'Feedback', required: false }
        ]
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBooking: async (req, res) => {
    try {
      console.log('=== Création d\'une nouvelle réservation ===');
      console.log('Données reçues:', JSON.stringify(req.body, null, 2));
      
      // Validation des données requises
      if (!req.body.user_id || !req.body.car_id || !req.body.start_date || !req.body.end_date) {
        console.error('Données manquantes:', {
          user_id: !req.body.user_id,
          car_id: !req.body.car_id,
          start_date: !req.body.start_date,
          end_date: !req.body.end_date
        });
        return res.status(400).json({ error: 'Données requises manquantes' });
      }

      // Log des informations des locataires
      console.log('Informations du locataire 1:', {
        locataire1: req.body.locataire1,
        adresse1: req.body.adresse1,
        cin1: req.body.cin1,
        permis1: req.body.permis1
      });

      console.log('Informations du locataire 2:', {
        locataire2: req.body.locataire2,
        adresse2: req.body.adresse2,
        cin2: req.body.cin2,
        permis2: req.body.permis2
      });

      // Création de l'objet de réservation avec tous les champs
      const bookingData = {
        user_id: req.body.user_id,
        car_id: req.body.car_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        total_price: req.body.total_price,
        locataire1: req.body.locataire1 || null,
        adresse1: req.body.adresse1 || null,
        cin1: req.body.cin1 || null,
        permis1: req.body.permis1 || null,
        locataire2: req.body.locataire2 || null,
        adresse2: req.body.adresse2 || null,
        cin2: req.body.cin2 || null,
        permis2: req.body.permis2 || null,
        status: 'pending'
      };

      console.log('Données à insérer:', JSON.stringify(bookingData, null, 2));

      const booking = await Booking.create(bookingData);

      console.log('Réservation créée avec succès:', {
        id: booking.id,
        status: booking.status,
        dates: {
          start: booking.start_date,
          end: booking.end_date
        },
        locataire1: booking.locataire1,
        locataire2: booking.locataire2
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      res.status(400).json({ error: error.message });
    }
  },

  updateBooking: async (req, res) => {
    try {
      console.log('=== Mise à jour d\'une réservation ===');
      console.log('ID de la réservation:', req.params.id);
      console.log('Données de mise à jour:', JSON.stringify(req.body, null, 2));

      const booking = await Booking.findByPk(req.params.id);
      if (!booking) {
        console.error('Réservation non trouvée:', req.params.id);
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Validation des champs requis
      const requiredFields = ['user_id', 'car_id', 'start_date', 'end_date', 'total_price'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        console.error('Champs requis manquants:', missingFields);
        return res.status(400).json({ 
          error: 'Missing required fields',
          missingFields: missingFields
        });
      }

      // Vérification des types de données
      if (typeof req.body.user_id !== 'number' || typeof req.body.car_id !== 'number') {
        return res.status(400).json({ error: 'user_id and car_id must be numbers' });
      }

      if (typeof req.body.total_price !== 'number') {
        return res.status(400).json({ error: 'total_price must be a number' });
      }

      // Vérification des dates
      const startDate = new Date(req.body.start_date);
      const endDate = new Date(req.body.end_date);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      if (startDate > endDate) {
        return res.status(400).json({ error: 'start_date must be before end_date' });
      }

      // Mise à jour de la réservation
      const updatedBooking = await booking.update({
        user_id: req.body.user_id,
        car_id: req.body.car_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        total_price: req.body.total_price,
        status: req.body.status,
        // Champs optionnels
        locataire1: req.body.locataire1 || booking.locataire1,
        adresse1: req.body.adresse1 || booking.adresse1,
        cin1: req.body.cin1 || booking.cin1,
        permis1: req.body.permis1 || booking.permis1,
        locataire2: req.body.locataire2 || booking.locataire2,
        adresse2: req.body.adresse2 || booking.adresse2,
        cin2: req.body.cin2 || booking.cin2,
        permis2: req.body.permis2 || booking.permis2
      });

      console.log('Réservation mise à jour avec succès:', {
        id: updatedBooking.id,
        status: updatedBooking.status,
        dates: {
          start: updatedBooking.start_date,
          end: updatedBooking.end_date
        }
      });

      res.json(updatedBooking);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      res.status(400).json({ error: error.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      console.log('=== Suppression d\'une réservation ===');
      console.log('ID de la réservation:', req.params.id);

      const booking = await Booking.findByPk(req.params.id);
      if (!booking) {
        console.error('Réservation non trouvée:', req.params.id);
        return res.status(404).json({ error: 'Booking not found' });
      }
      await booking.destroy();
      console.log('Réservation supprimée avec succès:', req.params.id);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getBookingsWithCarsAndFeedbacks: async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.findAll({
        where: { user_id: userId },
        include: [
          { model: Car },
          { model: Feedback, as: 'Feedback', required: false }
        ]
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
