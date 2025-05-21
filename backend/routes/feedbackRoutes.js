const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/', feedbackController.getAllFeedbacks);
router.get('/by-user-car', feedbackController.getFeedbackByUserCar); // ?user_id=...&car_id=...
router.get('/:id', feedbackController.getFeedbackById);
router.post('/', feedbackController.createFeedback);
router.put('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router; 