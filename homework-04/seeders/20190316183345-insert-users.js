'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@mail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Jay',
      lastName: 'Mathews',
      email: 'jay@mail.com',
      password: '654321',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Alex',
      lastName: 'Manford',
      email: 'alex@mail.com',
      password: 'qwerty',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      password: 'jd123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {email: {[Op.in]: ['bob@mail.com', 'jay@mail.com', 'alex@mail.com']}}, {}, {});
  }
};
