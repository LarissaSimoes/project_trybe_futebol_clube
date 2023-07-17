import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamsController.findAll(req, res));

export default router;
