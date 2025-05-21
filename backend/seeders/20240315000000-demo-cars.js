'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [
      {
        name: 'Mercedes',
        model: 'C-Class',
        year: 2023,
        price_per_day: 1200,
        fuel_type: 'petrol',
        transmission: 'automatic',
        location: 'Casablanca',
        seats: 5,
        availability: true,
        image_url: '/images/cars/mercedes-c-class.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BMW',
        model: 'X5',
        year: 2023,
        price_per_day: 1500,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Rabat',
        seats: 5,
        availability: true,
        image_url: '/images/cars/bmw-x5.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Audi',
        model: 'A4',
        year: 2023,
        price_per_day: 1100,
        fuel_type: 'petrol',
        transmission: 'automatic',
        location: 'Marrakech',
        seats: 5,
        availability: true,
        image_url: '/images/cars/audi-a4.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toyota',
        model: 'Land Cruiser',
        year: 2023,
        price_per_day: 2000,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Agadir',
        seats: 7,
        availability: true,
        image_url: '/images/cars/toyota-land-cruiser.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Range Rover',
        model: 'Sport',
        year: 2023,
        price_per_day: 2500,
        fuel_type: 'hybrid',
        transmission: 'automatic',
        location: 'Casablanca',
        seats: 5,
        availability: true,
        image_url: '/images/cars/range-rover-sport.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Porsche',
        model: 'Cayenne',
        year: 2023,
        price_per_day: 2200,
        fuel_type: 'petrol',
        transmission: 'automatic',
        location: 'Rabat',
        seats: 5,
        availability: true,
        image_url: '/images/cars/porsche-cayenne.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Volkswagen',
        model: 'Golf',
        year: 2023,
        price_per_day: 800,
        fuel_type: 'petrol',
        transmission: 'manual',
        location: 'Marrakech',
        seats: 5,
        availability: true,
        image_url: '/images/cars/vw-golf.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tesla',
        model: 'Model 3',
        year: 2023,
        price_per_day: 1800,
        fuel_type: 'electric',
        transmission: 'automatic',
        location: 'Casablanca',
        seats: 5,
        availability: true,
        image_url: '/images/cars/tesla-model3.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hyundai',
        model: 'Tucson',
        year: 2023,
        price_per_day: 900,
        fuel_type: 'hybrid',
        transmission: 'automatic',
        location: 'Agadir',
        seats: 5,
        availability: true,
        image_url: '/images/cars/hyundai-tucson.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kia',
        model: 'Sportage',
        year: 2023,
        price_per_day: 850,
        fuel_type: 'diesel',
        transmission: 'automatic',
        location: 'Rabat',
        seats: 5,
        availability: true,
        image_url: '/images/cars/kia-sportage.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Cars', cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
}; 