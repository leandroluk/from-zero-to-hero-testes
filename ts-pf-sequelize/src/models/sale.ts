import {
  DataTypes,
  ModelAttributes,
  ModelOptions,
  Sequelize
} from 'sequelize';
import { Sale, SequelizeModel } from '../types';

const tableName = 'sale';

const attributes: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sellerName: {
    allowNull: false,
    field: 'seller_name',
    type: DataTypes.STRING(100),
  },
  purchaserName: {
    allowNull: false,
    field: 'purchaser_name',
    type: DataTypes.STRING(100),
  },
};

const options: ModelOptions = {
  tableName,
  freezeTableName: true,
  timestamps: false,
};

const associate: SequelizeModel['associate'] = (_model, _models) => { };

type Add = Omit<Sale.Add, 'products'>

export default (sequelize: Sequelize): SequelizeModel<Sale, Add> => {
  const model = sequelize.define(tableName, attributes, options) as SequelizeModel<Sale, Add>;
  model.associate = associate;
  return model;
};
