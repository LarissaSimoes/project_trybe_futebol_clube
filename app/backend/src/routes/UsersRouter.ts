import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';
import TokenValidation from '../middlewares/TokenValidation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.loginValidation,
  (req: Request, res: Response) => usersController.findOne(req, res),
);

router.get(
  '/role',
  TokenValidation.validateToken,
  (req: Request, res: Response) => usersController.getRole(req, res),
);

export default router;
