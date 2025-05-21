'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const cars = [
      {
        name: 'BMW 320i',
        model: 'BMW 3 Series',
        year: 2022,
        price_per_day: 800,
        fuel_type: 'petrol',
        transmission: 'automatic',
        location: 'Casablanca',
        seats: 5,
        availability: true,
        image_url: 'https://via.placeholder.com/400x200?text=BMW+320i',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mercedes C200',
        model: 'Mercedes C-Class',
        year: 2023,
        price_per_day: 850,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Rabat',
        seats: 5,
        availability: true,
        image_url: 'https://via.placeholder.com/400x200?text=Mercedes+C200',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Audi A4',
        model: 'Audi A4',
        year: 2022,
        price_per_day: 780,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Marrakech',
        seats: 5,
        availability: true,
        image_url: 'https://via.placeholder.com/400x200?text=Audi+A4',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Range Rover Evoque',
        model: 'Land Rover Evoque',
        year: 2023,
        price_per_day: 1200,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Casablanca Airport',
        seats: 5,
        availability: true,
        image_url: 'https://via.placeholder.com/400x200?text=Range+Rover+Evoque',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Porsche Cayenne',
        model: 'Porsche Cayenne',
        year: 2022,
        price_per_day: 1500,
        fuel_type: 'petrol',
        transmission: 'automatic',
        location: 'Rabat',
        seats: 5,
        availability: true,
        image_url: 'https://via.placeholder.com/400x200?text=Porsche+Cayenne',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Cars', cars, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
}; 