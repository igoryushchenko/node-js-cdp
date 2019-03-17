'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Nice Book',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'T-Shirt',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Black Boots',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', {id: {[Sequelize.Op.in]: [1, 2, 3]}});
  }
};
