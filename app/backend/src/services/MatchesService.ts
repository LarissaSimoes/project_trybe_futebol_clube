import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamModel';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesService {
  private _matchesModel: MatchesModel;
  private _teamModel: TeamModel;

  constructor() {
    this._matchesModel = new MatchesModel();
    this._teamModel = new TeamModel();
  }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const result = await this._matchesModel.findAll();
    if (!result) return { status: 'NOT_FOUND', data: result };
    return { status: 'SUCCESSFUL', data: result };
  }

  public async findInProgress(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this._matchesModel.findInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number) {
    const match = await this._matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    const updatedMatch = await this._matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this._matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    const updatedMatch = await this._matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async createMatch(data: IMatches) : Promise<ServiceResponse<IMatches>> {
    const homeTeam = await this._teamModel.findById(data.homeTeamId);
    const awayTeam = await this._teamModel.findById(data.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this._matchesModel.createMatch(data);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
