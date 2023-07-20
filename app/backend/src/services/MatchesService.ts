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
}
