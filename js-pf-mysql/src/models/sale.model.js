const db = require('../db');
const { camelFields2Snake, selectSnakeAsCamel } = require('./_models');

const TABLE = 'sale';

const FIELDS = {
  id: 'id',
  sellerName: 'seller_name',
  purchaserName: 'purchaser_name',
};

const saleModel = {
  async add(data) {
    const sql = `
      INSERT INTO ${TABLE} (
        seller_name, purchaser_name
      ) VALUES ?;
    `;
    const row = [
      data.sellerName,
      data.purchaserName,
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
    await db.query(sql, [camelFields2Snake(changes, FIELDS), id]);
  },

  async remove(id) {
    const sql = `DELETE FROM ${TABLE} WHERE id = ?`;
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

module.exports = saleModel;
