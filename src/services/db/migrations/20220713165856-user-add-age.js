const tableName = 'Users'
const columnName = 'age'

const ages = [
  15, 
  25, 
  40
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.addColumn(
        tableName,
        columnName,
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        }, 
        { transaction: t }
      )

      await queryInterface.bulkUpdate(
        tableName,
        {
          [columnName]: ages[Math.floor(Math.random() * ages.length)]
        },
        {},
        { transaction: t }
      )

      await queryInterface.changeColumn(
        tableName,
        columnName,
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        }, 
        { transaction: t }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  }
};
