import {
  model,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions
} from 'mongoose';
import { Product } from '../types';

const collectionName = 'product';

const attributes: SchemaDefinition<Product> = {
  description: {
    required: true,
    type: Schema.Types.String,
  },
  price: {
    required: true,
    type: Schema.Types.Number,
  },
  unit: {
    required: true,
    type: Schema.Types.String,
  }
};

export default (
  defaultOptions: SchemaOptions
): Model<Product> => model<Product>(
  collectionName,
  new Schema(attributes, defaultOptions),
  collectionName
);
