/** @type {import('express').RequestHandler} */
const corsMiddleware = (_req, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', '*');
  res.setHeader('access-control-allow-headers', '*');
  next();
};

module.exports = corsMiddleware;
