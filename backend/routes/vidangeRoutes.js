const express = require('express');
const router = express.Router();
const vidangeController = require('../controllers/vidangeController');

// Routes pour les vidanges
router.post('/', vidangeController.createVidange);
router.get('/', vidangeController.getAllVidanges);
router.get('/:id', vidangeController.getVidangeById);
router.get('/car/:carId', vidangeController.getVidangesByCarId);
router.put('/:id', vidangeController.updateVidange);
router.delete('/:id', vidangeController.deleteVidange);
router.get('/:id/pdf', vidangeController.downloadVidangePDF);
router.post('/update-filters', vidangeController.updateAllFilters);

module.exports = router; 