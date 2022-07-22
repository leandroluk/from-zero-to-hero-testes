import { connect, Document, SchemaOptions } from 'mongoose';
import vars from '../vars';
import makeProduct from './product';
import makeSale from './sale';
import makeSalePoduct from './sale-product';

const defaultOptions: SchemaOptions = {
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(_, ret: Document) {
      const { _id: id, ...rest } = ret;
      return { id, ...rest };
    }
  }
};

export const ProductModel = makeProduct(defaultOptions);
export const SaleModel = makeSale(defaultOptions);
export const SaleProductModel = makeSalePoduct(defaultOptions);

export default async () => {
  await connect(vars.mongo.uri);
};
