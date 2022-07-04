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

export const productModel = makeProduct(defaultOptions);
export const saleModel = makeSale(defaultOptions);
export const saleProductModel = makeSalePoduct(defaultOptions);

export default async () => {
  await connect(vars.mongo.uri);
};
