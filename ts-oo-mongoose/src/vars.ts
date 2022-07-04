import path from 'path';
import packageJson from '../package.json';

const { env } = process;

export default {
  app: {
    path: path.resolve(__dirname, '..'),
    name: packageJson.name,
    port: Number(env.APP_PORT || 3000),
  },
  mongo: {
    uri: env.MONGO_URI || 'mongodb://localhost:27017/db',
  },
};
