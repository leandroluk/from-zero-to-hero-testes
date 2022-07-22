import Joi from 'joi';
import { NotFoundError } from '../errors';
import { ProductModel } from '../models';
import { AddProduct, EditProduct, Indexable, Product } from '../types';
import { toObjectId } from './_services';

export class ProductService {
  readonly validateParamsIdSchema = Joi.object<Indexable>({
    id: Joi.string().required().length(24).custom(toObjectId),
  }).required();

  readonly validateBodyAddSchema = Joi.object<AddProduct>({
    description: Joi.string().required().max(100),
    price: Joi.number().required().positive(),
    unit: Joi.string().required().max(20),
  }).required();

  readonly validateBodyEditSchema = Joi.object<EditProduct>({
    description: Joi.string().max(100),
    price: Joi.number().positive(),
    unit: Joi.string().max(20),
  }).required();

  constructor(
    readonly productModel: typeof ProductModel
  ) { }

  async validateParamsId(unknown: unknown): Promise<Indexable> {
    const result = await this.validateParamsIdSchema.validateAsync(unknown);
    return result;
  }

  async validateBodyAdd(unknown: unknown): Promise<AddProduct> {
    const result = await this.validateBodyAddSchema.validateAsync(unknown);
    return result;
  }

  async validateBodyEdit(unknown: unknown): Promise<EditProduct> {
    const result = await this.validateBodyEditSchema.validateAsync(unknown);
    return result;
  }

  async existsByArrayOfId(arrayOfId: Array<Product['id']>): Promise<void> {
    const items = await this.productModel.find({ _id: arrayOfId }) as Product[];
    arrayOfId.forEach((id, index) => {
      if (!items.some((item) => item.id === id)) {
        throw new NotFoundError(`"product[${index}]" not found.`);
      }
    });
  }

  async edit(_id: Product['id'], changes: EditProduct): Promise<void> {
    await this.productModel.updateOne({ _id }, changes);
  }

  async add(data: AddProduct): Promise<Product['id']> {
    const { id } = await this.productModel.create(data) as Product;
    return id;
  }

  async remove(_id: Product['id']): Promise<void> {
    await this.productModel.deleteOne({ _id });
  }

  async exists(_id: Product['id']): Promise<void> {
    const count = await this.productModel.count({ _id });
    if (!count) throw new NotFoundError('"product" not found.');
  }

  async get(_id: Product['id']): Promise<Product> {
    const model = await this.productModel.findOne({ _id });
    const product = model!.toJSON();
    return product;
  }

  async list(): Promise<Product[]> {
    const models = await this.productModel.find();
    const products = models.map((model: any) => model.toJSON());
    return products;
  }
}
