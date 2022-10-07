import { ErrorRequestHandler } from 'express';

const errors: Record<string, number> = {
  'ValidationError': 400,
  'NotFoundError': 404
}

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = errors[name];
  if (status) return res.status(status).json({ name, message });
  console.error(err);
  res.sendStatus(500);
};
