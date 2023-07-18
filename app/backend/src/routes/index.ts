import { Router } from 'express';
import UsersRouter from './UsersRouter';
import TeamsRoutes from './TeamsRoutes';

const router = Router();

router.use('/teams', TeamsRoutes);

router.use('/login', UsersRouter);

export default router;
