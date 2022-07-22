const Joi = require('joi');
const { productModel } = require('../models');
const { runSchema, throwNotFoundError } = require('./_services');

const productService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  }).required()),

  validateBodyAdd: runSchema(Joi.object({
    description: Joi.string().required().max(100),
    price: Joi.number().required().positive(),
    unit: Joi.string().required().max(20),
  }).required()),

  validateBodyEdit: runSchema(Joi.object({
    description: Joi.string().max(100),
    price: Joi.number().positive(),
    unit: Joi.string().max(20),
  }).required()),

  async add(data) {
    const id = await productModel.add(data);
    return id;
  },

  async exists(id) {
    const item = await productModel.get(id);
    if (!item) throwNotFoundError('"product" not found.');
  },

  async existsByArrayOfId(arrayOfId) {
    const items = await productModel.listByArrayOfId(arrayOfId);
    arrayOfId.forEach((id, index) => {
      if (!items.some((item) => item.id === id)) {
        throwNotFoundError(`"product[${index}]" not found.`);
      }
    });
  },

  async edit(id, changes) {
    await productModel.edit(id, changes);
  },

  async remove(id) {
    await productModel.remove(id);
  },

  async get(id) {
    const item = await productModel.get(id);
    return item;
  },

  async list() {
    const items = await productModel.list();
    return items;
  },
};

module.exports = productService;
