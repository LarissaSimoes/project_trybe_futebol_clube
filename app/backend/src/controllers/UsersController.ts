import { Request, Response } from 'express';
import UsersService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class UsersController {
  private _usersService: UsersService;

  constructor() {
    this._usersService = new UsersService();
  }

  public async findOne(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this._usersService.findOne(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json({ token: JWT.createToken(email) });
  }
}
