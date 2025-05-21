const { Review } = require('../models');

exports.getAllReviews = async (req, res) => {
    const reviews = await Review.findAll();
    res.json(reviews);
};

exports.getReviewById = async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    res.json(review);
};

exports.createReview = async (req, res) => {
    const review = await Review.create(req.body);
    res.json(review);
};

exports.updateReview = async (req, res) => {
    await Review.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Avis mis à jour" });
};

exports.deleteReview = async (req, res) => {
    await Review.destroy({ where: { id: req.params.id } });
    res.json({ message: "Avis supprimé" });
};
