const { faker }  = require('@faker-js/faker')
const { User } = require('../models')

const tableName = 'Pets'

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll()

    const pets = new Array(100).fill(null).map(user => ({
      name: faker.name.firstName(),
      age: faker.datatype.number({ min: 7, max: 70 }),
      image: '',
      UserId: users[Math.floor(Math.random() * users.length)].id,
      createdAt: new Date()
    }))


    await queryInterface.bulkInsert(tableName, pets, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {})
  }
};
