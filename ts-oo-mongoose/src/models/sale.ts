import {
  model,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions
} from 'mongoose';
import { Sale } from '../types';

const collectionName = 'sale';

const attributes: SchemaDefinition<Sale> = {
  sellerName: {
    required: true,
    type: Schema.Types.String,
  },
  purchaserName: {
    required: true,
    type: Schema.Types.String,
  },
};

export default (
  defaultOptions: SchemaOptions
): Model<Sale> => model<Sale>(
  collectionName,
  new Schema(attributes, defaultOptions),
  collectionName
);
