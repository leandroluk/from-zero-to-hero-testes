const mysql = require('mysql2/promise');
const vars = require('./vars');

const db = mysql.createPool({
  decimalNumbers: true,
  uri: vars.mysql.uri,
});

module.exports = db;
