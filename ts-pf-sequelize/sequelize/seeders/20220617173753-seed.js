/* eslint-disable camelcase */

/** @type {import('sequelize').QueryOptions} */
const bulkDeleteOptions = {
  truncate: true,
  cascate: true,
};

const listOfProduct = [
  {
    id: 1,
    description: 'Martelo do Thor',
    price: 100,
    unit: 'un',
  },
  {
    id: 2,
    description: 'Escudo do Capitao America',
    price: 85.70,
    unit: 'un',
  },
  {
    id: 3,
    description: 'Manopla do Thanos',
    price: 324.15,
    unit: 'un',
  },
  {
    id: 4,
    description: 'Armadura do Homem de Ferro',
    price: 753.25,
    unit: 'un',
  },
  {
    id: 5,
    description: 'Arco do Gaviao Arqueiro',
    price: 45.88,
    unit: 'un',
  },
];

const listOfSale = [
  {
    id: 1,
    seller_name: 'Anonymous',
    purchaser_name: 'Thanos',
  },
  {
    id: 2,
    seller_name: 'Wakanda',
    purchaser_name: 'Capitao America',
  },
];

const listOfSaleProduct = [
  {
    id: 1,
    sale_id: 1,
    product_id: 1,
    description: 'Martelo do Thor',
    quantity: 1,
    price: 210.26,
    unit: 'un',
  },
  {
    id: 2,
    sale_id: 1,
    product_id: 2,
    description: 'Escudo do Capitao America (V1)',
    quantity: 2,
    price: 98.10,
    unit: 'un',
  },
  {
    id: 3,
    sale_id: 1,
    product_id: 3,
    description: 'Manopla do Thanos',
    quantity: 1,
    price: 554.15,
    unit: 'un',
  },
  {
    id: 4,
    sale_id: 2,
    product_id: 5,
    description: 'Super Arco do Gaviao Arqueiro',
    quantity: 3,
    price: 57.66,
    unit: 'un',
  },
];

module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  async up(queryInterface) {
    await queryInterface.bulkInsert('product', listOfProduct);
    await queryInterface.bulkInsert('sale', listOfSale);
    await queryInterface.bulkInsert('sale_product', listOfSaleProduct);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  async down(queryInterface) {
    await queryInterface.bulkDelete('sale_product', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('sale', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('product', null, bulkDeleteOptions);
  },
};
