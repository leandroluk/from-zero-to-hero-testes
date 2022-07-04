import {
  model,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions
} from 'mongoose';
import { SaleProduct } from '../types';

const collectionName = 'sale_product';

const attributes: SchemaDefinition<SaleProduct> = {
  saleId: {
    required: true,
    type: Schema.Types.Number,
  },
  productId: {
    required: false,
    type: Schema.Types.Number,
  },
  description: {
    required: true,
    type: Schema.Types.String,
  },
  quantity: {
    required: true,
    type: Schema.Types.Number,
  },
  price: {
    required: true,
    type: Schema.Types.Number,
  },
  unit: {
    required: true,
    type: Schema.Types.String,
  },
};

export default (
  defaultOptions: SchemaOptions
): Model<SaleProduct> => model<SaleProduct>(
  collectionName,
  new Schema(attributes, defaultOptions),
  collectionName
);
