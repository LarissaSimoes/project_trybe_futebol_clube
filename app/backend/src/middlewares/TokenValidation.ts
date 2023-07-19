import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class TokenValidation {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = authorization.replace(/^Bearer\s/, '');
    try {
      JWT.verifyToken(token);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
