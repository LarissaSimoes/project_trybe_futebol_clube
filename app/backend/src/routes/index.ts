import { Router } from 'express';
import UsersRouter from './UsersRouter';
import TeamsRoutes from './TeamsRoutes';
import MatchesRouter from './MatchesRouter';

const router = Router();

router.use('/teams', TeamsRoutes);

router.use('/login', UsersRouter);

router.use('/matches', MatchesRouter);

export default router;
