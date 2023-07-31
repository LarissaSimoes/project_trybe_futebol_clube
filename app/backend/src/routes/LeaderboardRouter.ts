import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllTeamsLeaderboard(req, res),
);
router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeTeamsLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayTeamsLeaderboard(req, res),
);

export default router;
