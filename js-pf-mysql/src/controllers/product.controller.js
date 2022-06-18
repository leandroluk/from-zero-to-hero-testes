const { productService } = require('../services');

const productController = {
  /** @type {import('express').RequestHandler} */
  async remove(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.exists(id);
    await productService.remove(id);
    res.sendStatus(204);
  },

  /** @type {import('express').RequestHandler} */
  async edit(req, res) {
    const [{ id }, changes] = await Promise.all([
      productService.validateParamsId(req.params),
      productService.validateBodyEdit(req.body),
    ]);
    await productService.exists(id);
    await productService.edit(id, changes);
    const result = await productService.get(id);
    res.json(result);
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.exists(id);
    const result = await productService.get(id);
    res.json(result);
  },

  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const data = await productService.validateBodyAdd(req.body);
    const id = await productService.add(data);
    const result = await productService.get(id);
    res.status(201).json(result);
  },

  /** @type {import('express').RequestHandler} */
  async list(_req, res) {
    const result = await productService.list();
    res.json(result);
  },
};

module.exports = productController;
