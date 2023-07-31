import { IMatches } from './IMatches';

export interface ILeaderboard {
  getMatches(): Promise<IMatches[]>
}
