const { Feedback, User, Car } = require('../models');

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Car,
                    as: 'Car',
                    attributes: ['id', 'name', 'model', 'year']
                }
            ]
        });
        
        // Vérification des données
        console.log('Feedbacks:', JSON.stringify(feedbacks, null, 2));
        
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Error fetching feedbacks', details: error.message });
    }
};

exports.getFeedbackById = async (req, res) => {
    const feedback = await Feedback.findByPk(req.params.id);
    res.json(feedback);
};

// Vérifier si un feedback existe pour un user, une voiture et une période
exports.getFeedbackByUserCar = async (req, res) => {
    const { user_id, car_id } = req.query;
    const feedback = await Feedback.findOne({ where: { user_id, car_id } });
    res.json(feedback);
};

exports.createFeedback = async (req, res) => {
    const feedback = await Feedback.create(req.body);
    res.json(feedback);
};

exports.updateFeedback = async (req, res) => {
    await Feedback.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Feedback mis à jour" });
};

exports.deleteFeedback = async (req, res) => {
    await Feedback.destroy({ where: { id: req.params.id } });
    res.json({ message: "Feedback supprimé" });
}; 