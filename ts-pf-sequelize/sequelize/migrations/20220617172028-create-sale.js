const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sellerName: {
    allowNull: false,
    field: 'seller_name',
    type: DataTypes.STRING(100),
  },
  purchaserName: {
    allowNull: false,
    field: 'purchaser_name',
    type: DataTypes.STRING(100),
  },
};

module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up(queryInterface) {
    await queryInterface.createTable('sale', attributes);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down(queryInterface) {
    await queryInterface.dropTable('sale');
  },
};
