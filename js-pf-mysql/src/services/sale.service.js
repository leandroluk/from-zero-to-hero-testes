const Joi = require('joi');
const { saleModel, saleProductModel } = require('../models');
const { NotFoundError } = require('../errors');
const { runSchema } = require('./_services');

const saleService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  }).required()),

  validateBodyAdd: runSchema(Joi.object({
    sellerName: Joi.string().required().max(100),
    purchaserName: Joi.string().required().max(100),
    products: Joi.array().required().min(1).items(Joi.object({
      id: Joi.number().required().positive().integer(),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  validateBodyEdit: runSchema(Joi.object({
    sellerName: Joi.string().max(100),
    purchaserName: Joi.string().max(100),
    products: Joi.array().min(1).items(Joi.object({
      id: Joi.number().required().positive().integer(),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  async add(data) {
    const { products, ...saleData } = data;
    const id = await saleModel.add(saleData);
    await saleProductModel.bulkAddBySaleId(id, products);
    return id;
  },

  async exists(id) {
    const item = await saleModel.get(id);
    if (!item) throw new NotFoundError('"sale" not found.');
  },

  async edit(id, changes) {
    const { products, ...saleChanges } = changes;
    await saleModel.edit(id, saleChanges);
    if (products) {
      await saleProductModel.bulkRemoveBySaleId(id);
      await saleProductModel.bulkAddBySaleId(id, products);
    }
  },

  async remove(id) {
    await saleModel.remove(id);
  },

  async get(id) {
    const sale = await saleModel.get(id);
    sale.products = await saleProductModel.listBySaleId(id);
    return sale;
  },

  async list() {
    const items = await saleModel.list();
    return items;
  },
};

module.exports = saleService;
