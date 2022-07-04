import mongoose from 'mongoose';
import vars from '../vars';

export { default as productModel } from './product';
export { default as saleModel } from './sale';
export { default as salePoductModel } from './sale-product';

export default async () => {
  await mongoose.connect(vars.mongo.uri);
};
