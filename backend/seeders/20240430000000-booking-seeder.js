'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Récupérer les IDs des utilisateurs et des voitures existants
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;'
    );
    const cars = await queryInterface.sequelize.query(
      'SELECT id, price_per_day FROM cars;'
    );

    const userIds = users[0].map(user => user.id);
    const carIds = cars[0].map(car => car.id);
    const carPrices = cars[0].map(car => car.price_per_day);

    // Fonction pour générer une date aléatoire dans le futur
    const getRandomFutureDate = (daysFromNow) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      return date;
    };

    // Fonction pour calculer le prix total
    const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      return days * pricePerDay;
    };

    const bookings = [];

    // Créer des réservations avec différents statuts
    const statuses = ['pending', 'approved', 'completed', 'cancelled'];
    
    for (let i = 0; i < 20; i++) {
      const startDate = getRandomFutureDate(Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      const carIndex = Math.floor(Math.random() * carIds.length);
      const carId = carIds[carIndex];
      const pricePerDay = carPrices[carIndex];
      
      const totalPrice = calculateTotalPrice(startDate, endDate, pricePerDay);

      bookings.push({
        user_id: userIds[Math.floor(Math.random() * userIds.length)],
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        locataire1: `Locataire ${i + 1}`,
        adresse1: `Adresse ${i + 1}`,
        cin1: `CIN${i + 1}`,
        permis1: `Permis${i + 1}`,
        locataire2: Math.random() > 0.5 ? `Locataire2 ${i + 1}` : null,
        adresse2: Math.random() > 0.5 ? `Adresse2 ${i + 1}` : null,
        cin2: Math.random() > 0.5 ? `CIN2${i + 1}` : null,
        permis2: Math.random() > 0.5 ? `Permis2${i + 1}` : null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('bookings', bookings, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
}; 