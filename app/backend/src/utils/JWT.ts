import * as jwt from 'jsonwebtoken';

export type Token = { email: string };

export default class JWT {
  private static jwtSecret = process.env.JWT_SECRET || 'supersecret';

  static createToken(payload: Token): string {
    return jwt.sign(payload, JWT.jwtSecret);
  }

  static verifyToken(token: string) {
    return jwt.verify(token, JWT.jwtSecret);
  }
}
