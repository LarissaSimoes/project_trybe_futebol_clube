import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUsers } from '../Interfaces/IUsers';

export default class UsersService {
  private _usersModel: UsersModel;

  constructor() {
    this._usersModel = new UsersModel();
  }

  async findOne(email: string, password: string) : Promise<ServiceResponse<IUsers>> {
    const user = await this._usersModel.findOne(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }

  async getRole(email: string): Promise<ServiceResponse<IUsers>> {
    const user = await this._usersModel.findOne(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }
}
