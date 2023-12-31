import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesModel {
  private model = SequelizeMatchesModel;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
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

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async finishMatch(id: IMatches['id']) : Promise<IMatches | null> {
    await this.model.update({
      inProgress: false,
    }, {
      where: { id },
    });
    const dbData = await this.findById(id);
    return dbData;
  }

  async updateMatch(
    id: IMatches['id'],
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) : Promise<IMatches | null> {
    await this.model.update({
      homeTeamGoals, awayTeamGoals,
    }, {
      where: { id },
    });
    const dbData = await this.findById(id);
    return dbData;
  }

  async createMatch(data: IMatches): Promise<IMatches> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals,
      awayTeamId, awayTeamGoals, inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
