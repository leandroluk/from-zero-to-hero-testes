import app from './app';
import sequelize from './models';
import vars from './vars';

sequelize.authenticate()
  .then(() => app.listen(vars.app.port, () => {
    console.log(`[${vars.app.name}] running on port ${vars.app.port}`);
  }))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
