import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import { IUsers, UsersModelType } from '../Interfaces/IUsers';

export default class UsersModel implements UsersModelType {
  private model = SequelizeUsersModel;

  async findOne(email: IUsers['email']): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user;
  }
}
