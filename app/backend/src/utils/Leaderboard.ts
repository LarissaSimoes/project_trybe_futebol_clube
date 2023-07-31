import { IMatches } from '../Interfaces/IMatches';

export default class Leaderboard {
  private matches: IMatches[];
  private teamId: number;

  constructor(matches: IMatches[], teamId: number) {
    this.matches = matches;
    this.teamId = teamId;
  }

  private filterByTeamId(): IMatches[] {
    return this.matches.filter(
      (match) => match.homeTeamId === this.teamId || match.awayTeamId === this.teamId,
    );
  }

  get totalPoints(): number {
    const matchesByTeamId = this.filterByTeamId();

    return matchesByTeamId.reduce((total, match) => {
      const isAVictory = (match.homeTeamId
        === this.teamId && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals > match.homeTeamGoals);
      const isADefeat = match.homeTeamGoals === match.awayTeamGoals;

      let points = 0;

      if (isAVictory) {
        points = 3;
      } else if (isADefeat) {
        points = 1;
      }

      return total + points;
    }, 0);
  }

  get totalVictories(): number {
    const matchesByTeamId = this.filterByTeamId();

    const victories = matchesByTeamId.filter((match) =>
      (match.homeTeamId === this.teamId && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals > match.homeTeamGoals));

    return victories.length;
  }

  get totalDraws(): number {
    const matchesByTeamId = this.filterByTeamId();

    const draws = matchesByTeamId.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

    return draws.length;
  }

  get totalLosses(): number {
    const matchesByTeamId = this.filterByTeamId();

    const losses = matchesByTeamId.filter((match) =>
      (match.homeTeamId === this.teamId && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals < match.homeTeamGoals));

    return losses.length;
  }

  get goalsFavor(): number {
    const matchesByTeamId = this.filterByTeamId();

    const goalsScored = matchesByTeamId
      .map((match) => (match.homeTeamId === this.teamId
        ? match.homeTeamGoals : match.awayTeamGoals));

    return goalsScored.reduce((total, goals) => total + goals, 0);
  }

  get goalsOwn(): number {
    const matchesByTeamId = this.filterByTeamId();

    return matchesByTeamId.reduce((total, match) => {
      if (match.homeTeamId === this.teamId) {
        return total + match.awayTeamGoals;
      }
      return total + match.homeTeamGoals;
    }, 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const matchesByTeamId = this.filterByTeamId();
    const { totalPoints } = this;
    const totalMatches = matchesByTeamId.length;

    return +(100 * (totalPoints / (totalMatches * 3))).toFixed(2);
  }
}
