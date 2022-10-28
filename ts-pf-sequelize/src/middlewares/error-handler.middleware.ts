import { ErrorRequestHandler } from 'express';

const errors: Record<string, number> = {
  'ValidationError': 400,
  'NotFoundError': 404
}

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next): void => {
  const { name, message } = err;
  const status = errors[name];
  if (status) {
    res.status(status).json({ name, message });
    return
  }
  console.error(err);
  res.sendStatus(500);
};
