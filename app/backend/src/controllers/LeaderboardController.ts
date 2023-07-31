import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  async getHomeTeamsLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHomeTeamPerformance();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAwayTeamsLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAwayTeamPerformance();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAllTeamsLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllTeamsPerformance();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
