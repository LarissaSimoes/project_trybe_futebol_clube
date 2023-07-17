import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  private _teamsService: TeamsService;

  constructor() {
    this._teamsService = new TeamsService();
  }

  public async findAll(_req: Request, res: Response) {
    const response = await this._teamsService.findAll();
    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    res.status(200).json(response.data);
  }
}
