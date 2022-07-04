import Joi from 'joi';
import { NotFoundError } from '../errors';
import { saleModel, saleProductModel } from '../models';
import {
  AddSale,
  EditSale,
  FullSale,
  Indexable,
  Sale, SaleProducts
} from '../types';
import { runSchema, toObjectId } from './_services';

export const saleService = {
  validateParamsId: runSchema<Indexable>(Joi.object<Indexable>({
    id: Joi.string().required().length(24).custom(toObjectId),
  }).required()),

  validateBodyAdd: runSchema<AddSale>(Joi.object<AddSale>({
    sellerName: Joi.string().required().max(100),
    purchaserName: Joi.string().required().max(100),
    products: Joi.array().required().min(1).items(Joi.object<SaleProducts[0]>({
      id: Joi.string().required().length(24),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  validateBodyEdit: runSchema<EditSale>(Joi.object<EditSale>({
    sellerName: Joi.string().max(100),
    purchaserName: Joi.string().max(100),
    products: Joi.array().min(1).items(Joi.object<SaleProducts[0]>({
      id: Joi.string().required().length(24),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required()),

  async edit(saleId: Sale['id'], changes: EditSale): Promise<void> {
    const { products, ...saleChanges } = changes;
    await saleModel.updateOne({ _id: saleId }, saleChanges);
    if (products) {
      await saleProductModel.deleteMany({ saleId });
      const saleProducts = products
        .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
      await saleProductModel.insertMany(saleProducts);
    }
  },

  async add(data: AddSale) {
    const { products, ...saleData } = data;
    const { id: saleId } = await saleModel
      .create(saleData) as Sale;
    const saleProducts = products
      .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
    await saleProductModel.insertMany(saleProducts);
    return saleId;
  },

  async remove(_id: Sale['id']): Promise<void> {
    await saleModel.deleteOne({ _id });
  },

  async exists(_id: Sale['id']): Promise<void> {
    const count = await saleModel.count({ _id });
    if (!count) throw new NotFoundError('"sale" not found.');
  },

  async get(_id: Sale['id']): Promise<FullSale> {
    const modelSale = await saleModel.findOne({ _id });
    const sale = modelSale!.toJSON();
    const modelsSaleProduct = await saleProductModel.find({ saleId: _id });
    const products = modelsSaleProduct.map((item) => item.toJSON());
    return { ...sale, products } as FullSale;
  },

  async list(): Promise<Sale[]> {
    const sales = await saleModel
      .find() as Sale[];
    return sales;
  },
};
