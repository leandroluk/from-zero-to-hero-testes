const path = require('path');
const packageJson = require('../package.json');

const { env } = process;

const vars = {
  app: {
    path: path.resolve(__dirname, '..'),
    name: packageJson.name,
    port: Number(env.APP_PORT || 3000),
  },
  mysql: {
    uri: env.MYSQL_URI || 'mysql://root:root@localhost:3306/db',
  },
};

module.exports = vars;
