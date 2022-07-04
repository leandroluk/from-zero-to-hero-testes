import Joi from 'joi';
import { NotFoundError } from '../errors';
import { productModel } from '../models';
import { AddProduct, EditProduct, Indexable, Product } from '../types';
import { runSchema } from './_services';

export const productService = {
  validateParamsId: runSchema<Indexable>(Joi.object<Indexable>({
    id: Joi.number().required().positive().integer(),
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
      .find({ id: arrayOfId }) as Product[];
    arrayOfId.forEach((id, index) => {
      if (!items.some((item) => item.id === id)) {
        throw new NotFoundError(`"product[${index}]" not found.`);
      }
    });
  },

  async edit(id: Product['id'], changes: EditProduct): Promise<void> {
    await productModel.updateOne({ id }, changes);
  },

  async add(data: AddProduct): Promise<Product['id']> {
    const { id } = await productModel.create(data) as Product;
    return id;
  },

  async remove(id: Product['id']): Promise<void> {
    await productModel.deleteOne({ where: { id } });
  },

  async exists(id: Product['id']): Promise<void> {
    const count = await productModel.count({ id });
    if (!count) throw new NotFoundError('"product" not found.');
  },

  async get(id: Product['id']): Promise<Product> {
    const product = await productModel.findOne({ id }) as Product;
    return product;
  },

  async list(): Promise<Product[]> {
    const products = await productModel.find() as Product[];
    return products;
  },
};
