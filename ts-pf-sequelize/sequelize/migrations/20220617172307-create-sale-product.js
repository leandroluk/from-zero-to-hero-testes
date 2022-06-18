const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  saleId: {
    allowNull: false,
    field: 'sale_id',
    type: DataTypes.INTEGER,
    references: { model: 'sale', key: 'id' },
    onDelete: 'CASCADE',
  },
  productId: {
    allowNull: true,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: { model: 'product', key: 'id' },
    onDelete: 'SET NULL',
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  quantity: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  unit: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
};

module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up(queryInterface) {
    await queryInterface.createTable('sale_product', attributes);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down(queryInterface) {
    await queryInterface.dropTable('sale_product');
  },
};
