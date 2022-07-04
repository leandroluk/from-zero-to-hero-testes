import { Router } from 'express';
import connect from '../models';
import apiRoute from './api';

const route = Router();

route.use('/api', apiRoute);

route.get('/health', async (_req, res) => {
  await connect();
  res.sendStatus(200);
});

export default route;
