import { Router } from 'express';
import UsersRouter from './UsersRouter';
import TeamsRoutes from './TeamsRoutes';
import MatchesRouter from './MatchesRouter';
import LeaderboardRouter from './LeaderboardRouter';

const router = Router();

router.use('/teams', TeamsRoutes);

router.use('/login', UsersRouter);

router.use('/matches', MatchesRouter);

router.use('/leaderboard', LeaderboardRouter);

export default router;
