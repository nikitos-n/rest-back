const { faker }  = require('@faker-js/faker')

const tableName = 'Users'

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = new Array(100).fill(null).map(user => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 7, max: 70 }),
      createdAt: new Date()
    }))
    
    await queryInterface.bulkInsert(tableName, users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {})
  }
};
