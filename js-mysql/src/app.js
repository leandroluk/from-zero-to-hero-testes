const express = require('express');
require('express-async-errors');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// request middlewares
app.use(express.json());
app.use(middlewares.corsMiddleware);

// use case middlewres
app.use(routes);

// response middlewares
app.use(middlewares.errorHandlerMiddleware);

module.exports = app;
