import Joi from 'joi';
import { NotFoundError } from '../errors';
import { SaleModel, SaleProductModel } from '../models';
import {
  AddSale,
  EditSale,
  FullSale,
  Indexable,
  Sale, SaleProducts
} from '../types';
import { toObjectId } from './_services';

export class SaleService {
  readonly validateParamsIdSchema = Joi.object<Indexable>({
    id: Joi.string().required().length(24).custom(toObjectId),
  }).required();

  readonly validateBodyAddSchema = Joi.object<AddSale>({
    sellerName: Joi.string().required().max(100),
    purchaserName: Joi.string().required().max(100),
    products: Joi.array().required().min(1).items(Joi.object<SaleProducts[0]>({
      id: Joi.string().required().length(24),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required();

  readonly validateBodyEditSchema = Joi.object<EditSale>({
    sellerName: Joi.string().max(100),
    purchaserName: Joi.string().max(100),
    products: Joi.array().min(1).items(Joi.object<SaleProducts[0]>({
      id: Joi.string().required().length(24),
      description: Joi.string().required().max(100),
      quantity: Joi.number().required().positive(),
      price: Joi.number().required().min(0),
      unit: Joi.string().required().max(20),
    })),
  }).required();

  constructor(
    readonly saleModel: typeof SaleModel,
    readonly saleProductModel: typeof SaleProductModel
  ) { }

  async validateParamsId(unknown: unknown): Promise<Indexable> {
    const result = await this.validateParamsIdSchema.validateAsync(unknown);
    return result;
  }

  async validateBodyAdd(unknown: unknown): Promise<AddSale> {
    const result = this.validateBodyAddSchema.validateAsync(unknown);
    return result;
  }

  async validateBodyEdit(unknown: unknown): Promise<EditSale> {
    const result = this.validateBodyEditSchema.validateAsync(unknown);
    return result;
  }

  async edit(saleId: Sale['id'], changes: EditSale): Promise<void> {
    const { products, ...saleChanges } = changes;
    await this.saleModel.updateOne({ _id: saleId }, saleChanges);
    if (products) {
      await this.saleProductModel.deleteMany({ saleId });
      const saleProducts = products
        .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
      await this.saleProductModel.insertMany(saleProducts);
    }
  }

  async add(data: AddSale) {
    const { products, ...saleData } = data;
    const { id: saleId } = await this.saleModel
      .create(saleData) as Sale;
    const saleProducts = products
      .map(({ id, ...p }) => ({ productId: id, saleId, ...p }));
    await this.saleProductModel.insertMany(saleProducts);
    return saleId;
  }

  async remove(_id: Sale['id']): Promise<void> {
    await this.saleModel.deleteOne({ _id });
  }

  async exists(_id: Sale['id']): Promise<void> {
    const count = await this.saleModel.count({ _id });
    if (!count) throw new NotFoundError('"sale" not found.');
  }

  async get(_id: Sale['id']): Promise<FullSale> {
    const modelSale = await this.saleModel.findOne({ _id });
    const sale = modelSale!.toJSON();
    const modelsSaleProduct = await this.saleProductModel.find({ saleId: _id });
    const products = modelsSaleProduct.map((item: any) => item.toJSON());
    return { ...sale, products } as FullSale;
  }

  async list(): Promise<Sale[]> {
    const sales = await this.saleModel.find() as Sale[];
    return sales;
  }
}
