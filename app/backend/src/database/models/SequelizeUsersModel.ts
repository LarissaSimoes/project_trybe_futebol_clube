import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeUsersModel extends Model<InferAttributes<SequelizeUsersModel>,
InferCreationAttributes<SequelizeUsersModel>> {
  declare id: CreationOptional<number>;

  declare userName: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

SequelizeUsersModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'username',
  },
  role: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUsersModel;
