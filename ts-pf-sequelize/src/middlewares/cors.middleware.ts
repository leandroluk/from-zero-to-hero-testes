import { RequestHandler } from "express";

export const corsMiddleware: RequestHandler = (_req, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', '*');
  res.setHeader('access-control-allow-headers', '*');
  next();
};
