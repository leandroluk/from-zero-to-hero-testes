const { Router } = require('express');
const productRoute = require('./product.route');
const saleRoute = require('./sale.route');

const route = Router();

route.use('/products', productRoute);

route.use('/sales', saleRoute);

module.exports = route;
