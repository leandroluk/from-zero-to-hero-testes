const { Router } = require('express');
const { saleController } = require('../../controllers');

const route = Router();

route.delete('/:id', saleController.remove);

route.put('/:id', saleController.edit);

route.get('/:id', saleController.get);

route.post('/', saleController.add);

route.get('/', saleController.list);

module.exports = route;
