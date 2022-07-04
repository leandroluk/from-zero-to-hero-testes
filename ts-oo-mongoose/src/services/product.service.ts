import Joi from 'joi';
import { NotFoundError } from '../errors';
import { productModel } from '../models';
import { AddProduct, EditProduct, Indexable, Product } from '../types';
import { runSchema } from './_services';

export const productService = {
  validateParamsId: runSchema<Indexable>(Joi.object<Indexable>({
    id: Joi.string().required().length(24),
  }).required()),

  validateBodyAdd: runSchema<AddProduct>(Joi.object<AddProduct>({
    description: Joi.string().required().max(100),
    price: Joi.number().required().positive(),
    unit: Joi.string().required().max(20),
  }).required()),

  validateBodyEdit: runSchema<EditProduct>(Joi.object<EditProduct>({
    description: Joi.string().max(100),
    price: Joi.number().positive(),
    unit: Joi.string().max(20),
  }).required()),

  async existsByArrayOfId(arrayOfId: Array<Product['id']>): Promise<void> {
    const items = await productModel
      .find({ _id: arrayOfId }) as Product[];
    arrayOfId.forEach((id, index) => {
      if (!items.some((item) => item.id === id)) {
        throw new NotFoundError(`"product[${index}]" not found.`);
      }
    });
  },

  async edit(_id: Product['id'], changes: EditProduct): Promise<void> {
    await productModel.updateOne({ _id }, changes);
  },

  async add(data: AddProduct): Promise<Product['id']> {
    const { id } = await productModel.create(data) as Product;
    return id;
  },

  async remove(_id: Product['id']): Promise<void> {
    await productModel.deleteOne({ _id });
  },

  async exists(_id: Product['id']): Promise<void> {
    const count = await productModel.count({ _id });
    if (!count) throw new NotFoundError('"product" not found.');
  },

  async get(_id: Product['id']): Promise<Product> {
    const product = await productModel.findOne({ _id }) as Product;
    return product;
  },

  async list(): Promise<Product[]> {
    const products = await productModel.find() as Product[];
    return products;
  },
};
