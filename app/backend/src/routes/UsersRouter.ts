import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => usersController.findOne(req, res),
);

export default router;
