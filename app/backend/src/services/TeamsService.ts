import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import { ITeams } from '../Interfaces/Iteams';

export default class TeamsService {
  private _teamsModel: TeamModel;

  constructor() {
    this._teamsModel = new TeamModel();
  }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const result = await this._teamsModel.findAll();

    if (!result) return { status: 'NOT_FOUND', data: result };

    return {
      status: 'SUCCESSFUL',
      data: result,
    };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeams>> {
    const result = await this._teamsModel.findById(id);
    if (!result) return { status: 'NOT_FOUND', data: { message: JSON.stringify(result) } };
    return { status: 'SUCCESSFUL', data: result };
  }
}
