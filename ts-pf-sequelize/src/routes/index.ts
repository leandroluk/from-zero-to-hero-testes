import { Router } from 'express';
import models from '../models';
import apiRoute from './api';

const route = Router();

route.use('/api', apiRoute);

route.get('/health', async (_req, res) => {
  await models.authenticate();
  res.sendStatus(200);
});

export default route
