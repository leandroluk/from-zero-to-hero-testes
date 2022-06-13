const { Router } = require('express');
const { productController } = require('../../controllers');

const route = Router();

route.delete('/:id', productController.remove);

route.put('/:id', productController.edit);

route.get('/:id', productController.get);

route.post('/', productController.add);

route.get('/', productController.list);

module.exports = route;
