const express = require('express');
const router = express.Router();
const multer = require('multer');
const carController = require('../controllers/carController');
const { Car } = require('../models');

// Configuration de Multer pour uploader des images jpg/jpeg uniquement
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Le nom de fichier sera "timestamp-originalname"
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filtrer pour n'accepter que les images jpg/jpeg
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(new Error('Only jpg and jpeg images are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route pour créer une voiture
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Préparer les données
    const carData = {
      ...req.body,
      image_url: req.file ? '/' + req.file.path.replace(/\\/g, '/') : null
    };
    
    // Utiliser le contrôleur
    await carController.createCar({ body: carData }, res);
  } catch (error) {
    console.error('Erreur lors de la création de la voiture :', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer toutes les voitures
router.get('/', carController.getAllCars);

// Route pour récupérer une voiture par ID
router.get('/:id', carController.getCarById);

// Route pour mettre à jour une voiture
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, model, year, price_per_day, fuel_type, transmission, location, seats, availability, rating, matricule, kilometrage, reviews } = req.body;
    
    // Si une nouvelle image est envoyée, on la traite
    let image_url;
    if (req.file) {
      image_url = '/' + req.file.path.replace(/\\/g, '/');
    }
    
    // Construction des champs à mettre à jour
    const updateFields = {
      name,
      model,
      year,
      price_per_day,
      fuel_type,
      transmission,
      location,
      seats,
      availability: availability === 'true' || availability === true,
      rating,
      matricule,
      kilometrage,
      reviews
    };
    if (image_url) {
      updateFields.image_url = image_url;
    }
    
    await carController.updateCar({ params: { id: req.params.id }, body: updateFields }, res);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la voiture :", error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour supprimer une voiture
router.delete('/:id', carController.deleteCar);

// Get total car count
router.get('/count', async (req, res) => {
  try {
    const count = await Car.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching car count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour vérifier la disponibilité d'une voiture
router.get('/:id/availability', carController.checkCarAvailability);

module.exports = router;
