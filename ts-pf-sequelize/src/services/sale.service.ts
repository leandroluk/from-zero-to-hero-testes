import Joi from 'joi';
import { NotFoundError } from '../errors';
import { saleModel, saleProductModel } from '../models';
import { Indexable, Sale, SaleProduct } from '../types';
import { runSchema } from './_services';

export const saleService = {
  validateParamsId: runSchema<Indexable>(Joi.object<Indexable>({
    id: Joi.number().required().positive().integer(),
  }).required()),

  validateBodyAdd: runSchema<Sale.Add>(Joi.object<Sale.Add>({
    sellerName: Joi.string().required().max(100),
    purchaserName: Joi.string().required().max(100),
    products: Joi.array().required().min(1).items(Joi.object<Sale.Products[0]>({
      id: Joi.number().required().positive().integer(),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  validateBodyEdit: runSchema<Sale.Edit>(Joi.object<Sale.Edit>({
    sellerName: Joi.string().max(100),
    purchaserName: Joi.string().max(100),
    products: Joi.array().min(1).items(Joi.object<Sale.Products[0]>({
      id: Joi.number().required().positive().integer(),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  async edit(saleId: Sale['id'], changes: Sale.Edit): Promise<void> {
    const { products, ...saleChanges } = changes;
    await saleModel.update(saleChanges, { where: { id: saleId } });
    if (products) {
      await saleProductModel.destroy({ where: { saleId } });
      const saleProducts = products
        .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
      await saleProductModel.bulkCreate(saleProducts);
    }
  },

  async add(data: Sale.Add) {
    const { products, ...saleData } = data;
    const { id: saleId } = await saleModel
      .create(saleData, { raw: true }) as unknown as Sale;
    const saleProducts = products
      .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
    await saleProductModel.bulkCreate(saleProducts);
    return saleId;
  },

  async remove(id: Sale['id']): Promise<void> {
    await saleModel.destroy({ where: { id } });
  },

  async exists(id: Sale['id']): Promise<void> {
    const item = await saleModel.findByPk(id);
    if (!item) throw new NotFoundError('"sale" not found.');
  },

  async get(id: Sale['id']): Promise<Sale.Full | void> {
    const sale = await saleModel
      .findByPk(id, { raw: true }) as unknown as Sale;
    const products = await saleProductModel.findAll({
      where: { saleId: id }, raw: true
    }) as unknown as SaleProduct[];
    return { ...sale, products } as Sale.Full;
  },

  async list(): Promise<Sale[]> {
    const sales = await saleModel
      .findAll({ raw: true }) as unknown as Sale[];
    return sales;
  },
};
