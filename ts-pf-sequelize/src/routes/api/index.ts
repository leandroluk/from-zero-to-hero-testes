import { Router } from 'express';
import productRoute from './product.route';
import saleRoute from './sale.route';

const route = Router();

route.use('/products', productRoute);

route.use('/sales', saleRoute);

export default route;
