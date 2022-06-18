import { Sequelize } from 'sequelize';
import vars from '../vars';
import makeProduct from './product';
import makeSale from './sale';
import makeSalePoduct from './sale-product';

const sequelize = new Sequelize(vars.mysql.uri, {
  logging: false,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

export const productModel = makeProduct(sequelize)
export const saleModel = makeSale(sequelize)
export const saleProductModel = makeSalePoduct(sequelize)

const models = {
  productModel,
  saleModel,
  saleProductModel,
};

export default sequelize
