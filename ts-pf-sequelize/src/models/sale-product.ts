import {
  DataTypes,
  Model,
  ModelAttributes,
  ModelOptions,
  Sequelize
} from 'sequelize';
import { SaleProduct, SequelizeModel } from '../types';

const tableName = 'sale_product';

const attributes: ModelAttributes<Model<SaleProduct>> = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  saleId: {
    allowNull: false,
    field: 'sale_id',
    type: DataTypes.INTEGER,
    references: { model: 'sale', key: 'id' },
    onDelete: 'CASCADE',
  },
  productId: {
    allowNull: true,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: { model: 'product', key: 'id' },
    onDelete: 'SET NULL',
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  quantity: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  unit: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
};

const options: ModelOptions = {
  tableName,
  freezeTableName: true,
  timestamps: false,
};

const associate: SequelizeModel['associate'] = (through, models) => {
  const opts = { through, foreignKey: 'id' };
  models.saleModel.belongsToMany(models.productModel, { ...opts, otherKey: 'saleId' });
  models.productModel.belongsToMany(models.saleModel, { ...opts, otherKey: 'productId' });
};

export default (sequelize: Sequelize): SequelizeModel<SaleProduct> => {
  const model = sequelize.define(tableName, attributes, options) as SequelizeModel<SaleProduct>;
  model.associate = associate;
  return model;
};
