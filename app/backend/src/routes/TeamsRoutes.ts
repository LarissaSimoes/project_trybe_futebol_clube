import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamsController.findAll(req, res));

router.get('/teams/:id', (req: Request, res: Response) => teamsController.findById(req, res));

export default router;
