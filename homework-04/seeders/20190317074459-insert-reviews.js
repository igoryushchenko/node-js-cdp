'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const reviews = []
    const sequelize = queryInterface.sequelize;
    const ids1 = sequelize.query('SELECT id FROM "Products" WHERE name = ?', { replacements: ['Nice Book']})
    const ids2 = sequelize.query('SELECT id FROM "Products" WHERE name = ?', { replacements: ['T-Shirt']})
    const ids3 = sequelize.query('SELECT id FROM "Products" WHERE name = ?', { replacements: ['Black Boots']})
    return Promise.all([ids1, ids2, ids3]).then(ids => {
          ids.forEach(id => {
              reviews.push({
                  text: 'Awesome!',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  productId: id[0][0].id
              })
              reviews.push({
                  text: 'Cool!',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  productId: id[0][0].id
              })
              console.log(id[0][0].id)
          })
      }, reason => {
          console.log(reason)
          return
      }).then(() => {
          return queryInterface.bulkInsert('Reviews', reviews, {});
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', {}, {});
  }
};
