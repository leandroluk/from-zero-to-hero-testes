import { Router } from 'express';
import { makeProductController } from '../../factories';

const route = Router();
const productController = makeProductController();

route.delete('/:id', async (req, res) => productController.remove(req, res));

route.put('/:id', async (req, res) => productController.edit(req, res));

route.get('/:id', async (req, res) => productController.get(req, res));

route.post('/', async (req, res) => productController.add(req, res));

route.get('/', async (req, res) => productController.list(req, res));

export default route;
