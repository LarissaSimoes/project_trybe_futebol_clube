import { ICRUDModelReader } from './ICRUDModel';

export default interface IUsers {
  id: number,
  userName: string,
  role: string,
  email: string,
  password: string,
}

type UsersModelType = ICRUDModelReader<IUsers>;

export { IUsers, UsersModelType };
