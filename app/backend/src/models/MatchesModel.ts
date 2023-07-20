import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesModel {
  private model = SequelizeMatchesModel;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll(
      {
        attributes: { exclude: ['home_team_id', 'away_team_id'] },
        include: [
          { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return dbData;
  }

  async findInProgress(inProgress?: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }
}
