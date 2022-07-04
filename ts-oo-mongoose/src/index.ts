import app from './app';
import connect from './models';
import vars from './vars';

connect()
  .then(() => app.listen(vars.app.port, () => {
    console.log(`[${vars.app.name}] running on port ${vars.app.port}`);
  }))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
