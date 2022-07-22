import { Router } from 'express';
import { makeSaleController } from '../../factories';

const route = Router();
const saleController = makeSaleController();

route.delete('/:id', async (req, res) => saleController.remove(req, res));

route.put('/:id', async (req, res) => saleController.edit(req, res));

route.get('/:id', async (req, res) => saleController.get(req, res));

route.post('/', async (req, res) => saleController.add(req, res));

route.get('/', async (req, res) => saleController.list(req, res));

export default route;
