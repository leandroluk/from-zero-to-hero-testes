const db = require('../db');
const { selectSnakeAsCamel } = require('./_models');

const TABLE = 'sale_product';

const FIELDS = {
  id: 'id',
  saleId: 'sale_id',
  productId: 'product_id',
  description: 'description',
  quantity: 'quantity',
  price: 'price',
  unit: 'unit',
};

const saleProductModel = {
  async bulkAddBySaleId(saleId, items) {
    const sql = `
      INSERT INTO ${TABLE} (
        sale_id, product_id, description, quantity, price, unit
      ) VALUES ?
    `;
    const rows = items.map((item) => [
      saleId,
      item.id,
      item.description,
      item.quantity,
      item.price,
      item.unit,
    ]);
    await db.query(sql, [rows]);
  },

  async bulkRemoveBySaleId(saleId) {
    const sql = `
      DELETE FROM ${TABLE} 
      WHERE sale_id = ?
    `;
    await db.query(sql, [saleId]);
  },

  async listBySaleId(saleId) {
    const sql = `
      SELECT ${selectSnakeAsCamel(FIELDS)}
      FROM ${TABLE}
      WHERE sale_id = ?
    `;
    const [rows] = await db.query(sql, [saleId]);
    return rows;
  },
};

module.exports = saleProductModel;
