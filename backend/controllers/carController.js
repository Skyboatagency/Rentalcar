const { Car, Booking } = require('../models');
const { Op } = require('sequelize');

// Obtenir toutes les voitures
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une voiture par ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }
    res.json(car);
  } catch (error) {
    console.error('Erreur lors de la récupération de la voiture :', error);
    res.status(500).json({ error: error.message });
  }
};

// Ajouter une voiture
exports.createCar = async (req, res) => {
  try {
    console.log('Données reçues du frontend:', req.body);
    
    // Générer un nombre aléatoire de reviews entre 100 et 300
    const reviews = Math.floor(Math.random() * 201) + 100;
    console.log('Nombre de reviews généré:', reviews);
    
    // Créer la voiture avec le modèle Sequelize
    const car = await Car.create({
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      price_per_day: req.body.price_per_day,
      fuel_type: req.body.fuel_type,
      transmission: req.body.transmission,
      location: req.body.location,
      seats: req.body.seats,
      availability: req.body.availability === 'true' || req.body.availability === true,
      image_url: req.body.image_url,
      rating: req.body.rating,
      matricule: req.body.matricule,
      kilometrage: req.body.kilometrage,
      reviews: reviews
    }, {
      fields: ['name', 'model', 'year', 'price_per_day', 'fuel_type', 'transmission', 
               'location', 'seats', 'availability', 'image_url', 'rating', 
               'matricule', 'kilometrage', 'reviews']
    });
    
    console.log('Voiture créée avec succès:', car);
    
    res.status(201).json(car);
  } catch (error) {
    console.error('Erreur détaillée lors de la création de la voiture :', error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une voiture
exports.updateCar = async (req, res) => {
  try {
    await Car.update({
      ...req.body,
      reviews: req.body.reviews
    }, { where: { id: req.params.id } });
    const updatedCar = await Car.findByPk(req.params.id);
    res.json(updatedCar);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la voiture :", error);
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une voiture
exports.deleteCar = async (req, res) => {
  try {
    await Car.destroy({ where: { id: req.params.id } });
    res.json({ message: "Voiture supprimée" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la voiture :", error);
    res.status(500).json({ error: error.message });
  }
};

// Vérifier la disponibilité d'une voiture
exports.checkCarAvailability = async (req, res) => {
  try {
    const carId = req.params.id;
    const currentDate = new Date();

    // Trouver la prochaine réservation pour cette voiture
    const nextBooking = await Booking.findOne({
      where: {
        car_id: carId,
        end_date: {
          [Op.gt]: currentDate
        },
        status: {
          [Op.in]: ['pending', 'approved']
        }
      },
      order: [['end_date', 'ASC']]
    });

    if (nextBooking) {
      res.json({
        available: false,
        nextAvailableDate: nextBooking.end_date
      });
    } else {
      res.json({
        available: true,
        nextAvailableDate: currentDate
      });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la disponibilité :', error);
    res.status(500).json({ error: error.message });
  }
};
