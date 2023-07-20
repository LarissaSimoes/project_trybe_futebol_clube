import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeamsModel from './SequelizeTeamsModel';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.belongsTo(
  SequelizeTeamsModel,
  { foreignKey: 'home_team_id', as: 'homeTeam' },
);
SequelizeMatchesModel.belongsTo(
  SequelizeTeamsModel,
  { foreignKey: 'away_team_id', as: 'awayTeam' },
);
SequelizeTeamsModel.hasMany(
  SequelizeMatchesModel,
  { foreignKey: 'home_team_id', as: 'homeMatches' },
);
SequelizeTeamsModel.hasMany(
  SequelizeMatchesModel,
  { foreignKey: 'away_team_id', as: 'awayMatches' },
);

export default SequelizeMatchesModel;
