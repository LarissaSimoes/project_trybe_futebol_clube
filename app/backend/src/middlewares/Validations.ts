import { Request, Response, NextFunction } from 'express';

export interface ILogin {
  email: string;
  password: string;
}

export default class Validations {
  private static minPasswordLength = 6;
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.emailRegex.test(email) || password.length < Validations.minPasswordLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
