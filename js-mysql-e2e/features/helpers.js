const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')

const { env } = process

const db = mysql.createPool({
  uri: env.MYSQL_URI || 'mysql://root:root@localhost:13306/db',
  multipleStatements: true
})

const seedSqlFile = path.join(__dirname, '..', '..', 'js-mysql', 'mist', 'seed.sql')

const seedSql = fs.readFileSync(seedSqlFile, 'utf8')

const runSeed = async () => await db.query(seedSql)

module.exports = {
  db,
  runSeed
}
