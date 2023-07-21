import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidation from '../middlewares/TokenValidation';
import MatchesValidation from '../middlewares/MatchesValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  TokenValidation.validateToken,
  MatchesValidation.validateMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
