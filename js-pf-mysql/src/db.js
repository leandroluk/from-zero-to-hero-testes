const mysql = require('mysql2/promise');
const vars = require('./vars');

const db = mysql.createPool({
  uri: vars.mysql.uri,
  decimalNumbers: true,
});

module.exports = db;
