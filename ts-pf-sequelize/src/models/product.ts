import {
  DataTypes,
  Model,
  ModelAttributes,
  ModelOptions,
  Sequelize
} from 'sequelize';
import { Product, SequelizeModel } from '../types';

const tableName = 'product';

const attributes: ModelAttributes<Model<Product>> = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(100),
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

const associate: SequelizeModel['associate'] = (_model, _models) => { };

export default (sequelize: Sequelize): SequelizeModel<Product> => {
  const model = sequelize.define(tableName, attributes, options) as SequelizeModel<Product>;
  model.associate = associate;
  return model;
};
