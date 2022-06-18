const corsMiddleware = require('./cors.middleware');
const errorHandlerMiddleware = require('./error-handler.middleware');

module.exports = {
  corsMiddleware,
  errorHandlerMiddleware,
};
