const { Router } = require('express');
const db = require('../db');
const apiRoute = require('./api');

const route = Router();

route.use('/api', apiRoute);

route.get('/health', async (_req, res) => {
  await db.query('SELECT 1');
  res.sendStatus(200);
});

module.exports = route;
