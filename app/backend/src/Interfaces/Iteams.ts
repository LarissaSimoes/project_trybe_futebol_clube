import { ICRUDModelReader } from './ICRUDModel';

export default interface ITeams {
  id: number,
  teamName: string,
}

type TeamsModelType = ICRUDModelReader<ITeams>;

export { ITeams, TeamsModelType };
