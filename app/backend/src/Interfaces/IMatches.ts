import { ICRUDModel } from './ICRUDModel';

export interface IMatches {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

type MatchesModelType = ICRUDModel<IMatches>;

export { MatchesModelType };
