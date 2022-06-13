const { saleService, productService } = require('../services');

const saleController = {
  /** @type {import('express').RequestHandler} */
  async remove(req, res) {
    const { id } = await saleService.validateParamsId(req.params);
    await saleService.exists(id);
    await saleService.remove(id);
    res.sendStatus(204);
  },

  /** @type {import('express').RequestHandler} */
  async edit(req, res) {
    const [{ id }, changes] = await Promise.all([
      saleService.validateParamsId(req.params),
      saleService.validateBodyEdit(req.body),
    ]);
    await saleService.exists(id);
    await saleService.edit(id, changes);
    const result = await saleService.get(id);
    res.json(result);
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const { id } = await saleService.validateParamsId(req.params);
    await saleService.exists(id);
    const result = await saleService.get(id);
    res.json(result);
  },

  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const data = await saleService.validateBodyAdd(req.body);
    const arrayOfProductId = data.products.map((product) => product.id);
    await productService.existsByArrayOfId(arrayOfProductId);
    const id = await saleService.add(data);
    const result = await saleService.get(id);
    res.status(201).json(result);
  },

  /** @type {import('express').RequestHandler} */
  async list(_req, res) {
    const result = await saleService.list();
    res.json(result);
  },
};

module.exports = saleController;
