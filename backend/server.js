const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir le dossier "uploads" pour permettre l'accès aux images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importation des routes
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const vidangeRoutes = require('./routes/vidangeRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Configuration des routes
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/vidanges', vidangeRoutes);
app.use('/api/admins', adminRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send("🚗 Bienvenue sur l'API de location de voitures");
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Définition de l'adresse IP et du port depuis .env
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, HOST, async () => {
  try {
    await sequelize.sync();
    console.log(`🚀 Serveur lancé sur http://${HOST}:${PORT}`);
    console.log('📦 Base de données synchronisée');
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
  }
});
