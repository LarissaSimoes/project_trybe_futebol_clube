import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const isInProgress = !inProgress ? undefined : inProgress === 'true';
    if (isInProgress === undefined) {
      const response = await this._matchesService.findAll();
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    const inProgressMatches = await this._matchesService.findInProgress(isInProgress);
    return res.status(mapStatusHTTP(inProgressMatches.status)).json(inProgressMatches.data);
  }

  public async finishMatch(req: Request, res: Response) : Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this._matchesService.finishMatch(id);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json({ message: 'Finished' });
  }
}
