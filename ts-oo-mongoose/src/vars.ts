import path from 'path';
import packageJson from '../package.json';

const { env } = process;

export default {
  app: {
    path: path.resolve(__dirname, '..'),
    name: packageJson.name,
    port: Number(env.APP_PORT || 3000),
  },
  mysql: {
    uri: env.MYSQL_URI || 'mysql://root:root@localhost:3306/db',
  },
};
