import Joi from 'joi';
import { NotFoundError } from '../errors';
import { saleModel, saleProductModel } from '../models';
import { Indexable, Sale, SaleProduct } from '../types';
import { runSchema } from './_services';

const productsOfsale2saleProduct = (
  saleId: Sale['id'],
  products: Sale.Products,
) => products.map(({ id, ...product }) => ({
  productId: id,
  saleId,
  ...product,
}));

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

  async add(data: Sale.Add) {
    const { products, ...saleData } = data;
    const { id } = await saleModel.create(saleData) as unknown as Sale;
    const listOfSaleProduct = productsOfsale2saleProduct(id, products);
    await saleProductModel.bulkCreate(listOfSaleProduct);
    return id;
  },

  async exists(id: Sale['id']): Promise<void> {
    const item = await saleModel.findByPk(id);
    if (!item) throw new NotFoundError('"sale" not found.');
  },

  async edit(id: Sale['id'], changes: Sale.Edit): Promise<void> {
    const { products, ...saleChanges } = changes;
    await saleModel.update(saleChanges, { where: { id } });
    if (products) {
      await saleProductModel.destroy({ where: { saleId: id } });
      const listOfSaleProduct = productsOfsale2saleProduct(id, products);
      await saleProductModel.bulkCreate(listOfSaleProduct);
    }
  },

  async remove(id: Sale['id']): Promise<void> {
    await saleModel.destroy({ where: { id } });
  },

  async get(id: Sale['id']): Promise<Sale.Full> {
    const saleInstance = await saleModel.findByPk(id);
    const sale = saleInstance?.toJSON();
    const productInstances = await saleProductModel
      .findAll({ where: { saleId: id } });
    const products: SaleProduct[] = productInstances
      .map((product) => product.toJSON());
    return { ...sale, products } as Sale.Full;
  },

  async list(): Promise<Sale[]> {
    const items = await saleModel.findAll();
    const sales = items.map((item) => item.toJSON());
    return sales as Sale[];
  },
};
