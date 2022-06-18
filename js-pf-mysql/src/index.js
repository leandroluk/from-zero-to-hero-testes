const db = require('./db');
const app = require('./app');
const vars = require('./vars');

db.query('SELECT 1')
  .then(() => app.listen(vars.app.port, () => {
    console.log(`[${vars.app.name}] running on port ${vars.app.port}`);
  }))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
