const db = require('../models');
const { Car, Vidange } = db;
const PDFDocument = require('pdfkit');

// Créer une nouvelle vidange
exports.createVidange = async (req, res) => {
  try {
    const {
      car_id,
      car_name,
      car_model,
      date,
      huile,
      depart_km,
      prochain_km,
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere,
      total
    } = req.body;

    const car = await Car.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    const vidange = await Vidange.create({
      car_id,
      car_name,
      car_model,
      date,
      huile,
      depart_km,
      prochain_km,
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere,
      total
    });

    res.status(201).json(vidange);
  } catch (error) {
    console.error('Erreur lors de la création de la vidange:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la vidange', error: error.message });
  }
};

// Obtenir toutes les vidanges
exports.getAllVidanges = async (req, res) => {
  try {
    const vidanges = await Vidange.findAll({
      include: [{
        model: Car,
        attributes: ['id', 'name', 'model', 'matricule', 'kilometrage']
      }]
    });
    res.json(vidanges);
  } catch (error) {
    console.error('Error getting all vidanges:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une vidange par ID
exports.getVidangeById = async (req, res) => {
  try {
    const vidange = await Vidange.findByPk(req.params.id, {
      include: [{
        model: Car,
        attributes: ['id', 'name', 'model', 'matricule', 'kilometrage']
      }]
    });
    
    if (!vidange) {
      return res.status(404).json({ message: 'Vidange non trouvée' });
    }
    
    res.json(vidange);
  } catch (error) {
    console.error('Error getting vidange by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les vidanges d'une voiture
exports.getVidangesByCarId = async (req, res) => {
  try {
    console.log('Getting vidanges for car:', req.params.carId);
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
      console.log('Car not found:', req.params.carId);
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    const vidanges = await Vidange.findAll({
      where: { car_id: req.params.carId },
      include: [{
        model: Car,
        attributes: ['id', 'name', 'model', 'matricule', 'kilometrage']
      }]
    });

    console.log('Found vidanges:', vidanges);
    res.json(vidanges);
  } catch (error) {
    console.error('Error getting vidanges by car id:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des vidanges',
      error: error.message,
      stack: error.stack
    });
  }
};

// Mettre à jour une vidange
exports.updateVidange = async (req, res) => {
  try {
    const {
      car_id,
      car_name,
      car_model,
      date,
      huile,
      depart_km,
      prochain_km,
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere,
      total
    } = req.body;

    const vidange = await Vidange.findByPk(req.params.id);
    if (!vidange) {
      return res.status(404).json({ message: 'Vidange non trouvée' });
    }

    await vidange.update({
      car_id,
      car_name,
      car_model,
      date,
      huile,
      depart_km,
      prochain_km,
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere,
      total
    });

    res.json(vidange);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la vidange:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la vidange', error: error.message });
  }
};

// Supprimer une vidange
exports.deleteVidange = async (req, res) => {
  try {
    const vidange = await Vidange.findByPk(req.params.id);
    
    if (!vidange) {
      return res.status(404).json({ message: 'Vidange non trouvée' });
    }

    await vidange.destroy();
    res.json({ message: 'Vidange supprimée avec succès' });
  } catch (error) {
    console.error('Error deleting vidange:', error);
    res.status(500).json({ message: error.message });
  }
};

// Générer et télécharger le PDF d'une vidange
exports.downloadVidangePDF = async (req, res) => {
  try {
    const vidange = await Vidange.findByPk(req.params.id, {
      include: [{
        model: Car,
        attributes: ['name', 'model', 'matricule', 'kilometrage']
      }]
    });

    if (!vidange) {
      return res.status(404).json({ message: 'Vidange non trouvée' });
    }

    const formatNumber = (value) => {
      if (!value) return '0.00';
      const num = parseFloat(value);
      return isNaN(num) ? '0.00' : num.toFixed(2);
    };

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=vidange_${vidange.id}.pdf`);
    doc.pipe(res);

    // Titre
    doc.fontSize(20).text('Fiche de maintenance', { align: 'center' });
    doc.moveDown();

    // Informations du véhicule
    doc.fontSize(12);
    doc.text('Informations du véhicule');
    doc.text(`Voiture: ${vidange.Car.name} ${vidange.Car.model}`);
    doc.text(`Matricule: ${vidange.Car.matricule}`);
    doc.text(`Kilométrage: ${vidange.Car.kilometrage} km`);
    doc.moveDown();

    // Date et kilométrage
    doc.text('Informations de maintenance');
    doc.text(`Date: ${new Date(vidange.date).toLocaleDateString()}`);
    doc.text(`Huile: ${vidange.huile || 'Non spécifié'}`);
    doc.text(`Kilométrage départ: ${formatNumber(vidange.depart_km)} km`);
    doc.text(`Prochain kilométrage: ${formatNumber(vidange.prochain_km)} km`);
    doc.moveDown();

    // État des filtres
    doc.text('État des filtres');
    doc.text('Filtres actuels:');
    doc.text(`- Filtre à huile: ${vidange.filtre_huile_actuel ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à gasoil: ${vidange.filtre_gasoil_actuel ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à air: ${vidange.filtre_air_actuel ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à habitacle: ${vidange.filtre_habitacle_actuel ? 'Oui' : 'Non'}`);
    doc.moveDown();

    doc.text('Filtres prochains:');
    doc.text(`- Filtre à huile: ${vidange.filtre_huile_prochain ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à gasoil: ${vidange.filtre_gasoil_prochain ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à air: ${vidange.filtre_air_prochain ? 'Oui' : 'Non'}`);
    doc.text(`- Filtre à habitacle: ${vidange.filtre_habitacle_prochain ? 'Oui' : 'Non'}`);
    doc.moveDown();

    // Mesures
    doc.text('Mesures (en km)');
    doc.text(`Plaquettes de frein: ${formatNumber(vidange.plaquette_frein)}`);
    doc.text(`Disques de frein: ${formatNumber(vidange.disque_frein)}`);
    doc.text(`Pneus: ${formatNumber(vidange.pneus)}`);
    doc.text(`Radiateur: ${formatNumber(vidange.radiateur)}`);
    doc.moveDown();

    // Huiles et composants
    doc.text('Huiles et composants (en km)');
    doc.text(`Huile boîte de vitesse: ${formatNumber(vidange.huile_boite_vitesse)}`);
    doc.text(`Huile de frein: ${formatNumber(vidange.huile_frein)}`);
    doc.text(`Kit d'embrayage: ${formatNumber(vidange.kit_embrayage)}`);
    doc.moveDown();

    // Amortisseurs
    doc.text('Amortisseurs (en km)');
    doc.text(`Amortisseur avant: ${formatNumber(vidange.amortisseur_avant)}`);
    doc.text(`Amortisseur arrière: ${formatNumber(vidange.amortisseur_arriere)}`);
    doc.moveDown();

    // Coût total
    doc.text('Coût total');
    doc.text(`Total: ${formatNumber(vidange.total)} MAD`);

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
  }
};

// Mettre à jour tous les filtres d'une voiture
exports.updateAllFilters = async (req, res) => {
  try {
    const {
      car_id,
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere
    } = req.body;

    const car = await Car.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    // Créer une nouvelle entrée de vidange avec les filtres mis à jour
    const vidange = await Vidange.create({
      car_id,
      car_name: car.name,
      car_model: car.model,
      date: new Date(),
      filtre_huile_actuel,
      filtre_huile_prochain,
      filtre_gasoil_actuel,
      filtre_gasoil_prochain,
      filtre_air_actuel,
      filtre_air_prochain,
      filtre_habitacle_actuel,
      filtre_habitacle_prochain,
      plaquette_frein,
      disque_frein,
      pneus,
      radiateur,
      huile_boite_vitesse,
      huile_frein,
      kit_embrayage,
      amortisseur_avant,
      amortisseur_arriere,
      total: 0 // Le total sera calculé séparément si nécessaire
    });

    res.status(201).json({
      message: 'Tous les filtres ont été mis à jour avec succès',
      vidange
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des filtres:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour des filtres', 
      error: error.message 
    });
  }
}; 