import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesService {
  private _matchesModel: MatchesModel;

  constructor() {
    this._matchesModel = new MatchesModel();
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
}
