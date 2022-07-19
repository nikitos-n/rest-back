const tableName = 'Pets'
const columnName = 'updatedAt'

module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.changeColumn(
    tableName,
    columnName,
    {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  }
};
