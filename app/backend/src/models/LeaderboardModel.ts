import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { IMatches } from '../Interfaces/IMatches';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';

export default class LeaderboardModel implements ILeaderboard {
  private model = SequelizeMatchesModel;

  async getMatches(): Promise<IMatches[]> {
    return this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
    });
  }
}
