/** @type {import('express').ErrorRequestHandler} */
const errorHandlerMiddleware = (err, _req, res, next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'UnauthorizedError': res.status(401).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    case 'ConflitError': res.status(409).json({ message }); break;
    default: console.error(err); res.sendStatus(500);
  }
  next();
};

module.exports = errorHandlerMiddleware;
