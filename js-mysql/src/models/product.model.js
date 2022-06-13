const db = require('../db');
const {
  objToKeyValues,
  camel2snake,
  empty2null,
} = require('./_models');

const TABLE = 'product';

const productModel = {
  async add(data) {
    const sql = `
      INSERT INTO ${TABLE} (
        description, price, unit
      ) VALUES ?;
    `;
    const row = empty2null([
      data.description,
      data.price,
      data.unit,
    ]);
    const [{ insertId }] = await db.query(sql, [[row]]);
    return insertId;
  },

  async edit(id, changes) {
    const [keys, values] = objToKeyValues(changes);
    const sql = `
      UPDATE ${TABLE} 
      SET ${keys.map((key) => `${camel2snake(key)} = ?`).join()} 
      WHERE id = ?;
    `;
    await db.query(sql, [...empty2null(values), id]);
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
      SELECT 
        id,
        description, 
        price, 
        unit
      FROM ${TABLE}
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  async listByArrayOfId(arrayOfId) {
    const sql = `
      SELECT 
        id,
        description, 
        price, 
        unit
      FROM ${TABLE}
      WHERE id IN ?
    `;
    const [rows] = await db.query(sql, [[arrayOfId]]);
    return rows;
  },

  async get(id) {
    const sql = `
      SELECT 
        id,
        description, 
        price, 
        unit
      FROM ${TABLE}
      WHERE id = ?
    `;
    const [[row]] = await db.query(sql, [id]);
    return row;
  },
};

module.exports = productModel;
