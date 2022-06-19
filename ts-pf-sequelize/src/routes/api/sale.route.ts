import { Router } from 'express';
import { saleController } from '../../controllers';

const route = Router();

route.delete('/:id', saleController.remove);

route.put('/:id', saleController.edit);

route.get('/:id', saleController.get);

route.post('/', saleController.add);

route.get('/', saleController.list);

export default route;
