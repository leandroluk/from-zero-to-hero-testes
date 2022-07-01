const db = require('../db');
const { selectSnakeAsCamel } = require('./_models');

const TABLE = 'product';

const FIELDS = {
  id: 'id',
  description: 'description',
  price: 'price',
  unit: 'unit',
};

const productModel = {
  async add(data) {
    const sql = `
      INSERT INTO ${TABLE} (
        description, price, unit
      ) VALUES ?;
    `;
    const row = [
      data.description,
      data.price,
      data.unit,
    ];
    const [{ insertId }] = await db.query(sql, [[row]]);
    return insertId;
  },

  async edit(id, changes) {
    const sql = `
      UPDATE ${TABLE} 
      SET ?
      WHERE id = ?;
    `;
    await db.query(sql, [changes, id]);
  },

  async remove(id) {
    const sql = `
      DELETE FROM ${TABLE} 
      WHERE id = ?
    `;
    await db.query(sql, [id]);
  },

  async list() {
    const sql = `
      SELECT ${selectSnakeAsCamel(FIELDS)}
      FROM ${TABLE}
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  async listByArrayOfId(arrayOfId) {
    const sql = `
      SELECT ${selectSnakeAsCamel(FIELDS)}
      FROM ${TABLE}
      WHERE id IN ?
    `;
    const [rows] = await db.query(sql, [[arrayOfId]]);
    return rows;
  },

  async get(id) {
    const sql = `
      SELECT ${selectSnakeAsCamel(FIELDS)}
      FROM ${TABLE}
      WHERE id = ?
    `;
    const [[row]] = await db.query(sql, [id]);
    return row;
  },
};

module.exports = productModel;
