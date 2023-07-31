import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ITeamPerformance } from '../Interfaces/ITeamPerformance';
import { ILeaderboardData } from '../Interfaces/ILeaderboardData';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Leaderboard from '../utils/Leaderboard';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamModel from '../models/TeamModel';

export default class LeaderboardService {
  private leaderboard: ITeamPerformance[] = [];
  private leaderboardData = {} as ILeaderboardData;

  constructor(private leaderboardModel: ILeaderboard = new LeaderboardModel()) { }

  private async getMatchesAndTeams(): Promise<ILeaderboardData> {
    const [matches, teams] = await Promise.all([
      this.leaderboardModel.getMatches(),
      new TeamModel().findAll(),
    ]);

    this.leaderboardData = {
      matches,
      teams,
    };

    return this.leaderboardData;
  }

  private async createHomeTeamLeaderboard(): Promise<ITeamPerformance[]> {
    const { matches, teams } = await this.getMatchesAndTeams();

    return teams.reduce((leaderboard, team) => {
      const homeStats = matches.filter((match) => team.id === match.homeTeamId);
      const leaderboardBuilder = new Leaderboard(homeStats, team.id);
      leaderboard.push(this.buildTeamsPerformances(
        team.teamName,
        leaderboardBuilder,

        homeStats.length,
      ));
      return leaderboard;
    }, [] as ITeamPerformance[]);
  }

  public async getHomeTeamPerformance(): Promise<ServiceResponse<ITeamPerformance[]>> {
    this.leaderboard = await this.createHomeTeamLeaderboard();
    return { status: 'SUCCESSFUL', data: this.buildTeamsClassification() };
  }

  private async createAwayTeamLeaderboard(): Promise<ITeamPerformance[]> {
    const { matches, teams } = await this.getMatchesAndTeams();

    return teams.reduce((leaderboard, team) => {
      const awayStats = matches.filter((match) => team.id === match.awayTeamId);
      const leaderboardBuilder = new Leaderboard(awayStats, team.id);
      leaderboard.push(this.buildTeamsPerformances(
        team.teamName,
        leaderboardBuilder,

        awayStats.length,
      ));
      return leaderboard;
    }, [] as ITeamPerformance[]);
  }

  public async getAwayTeamPerformance(): Promise<ServiceResponse<ITeamPerformance[]>> {
    this.leaderboard = await this.createAwayTeamLeaderboard();
    return { status: 'SUCCESSFUL', data: this.buildTeamsClassification() };
  }

  private async createAllTeamsLeaderboard(): Promise<ITeamPerformance[]> {
    const { matches, teams } = await this.getMatchesAndTeams();

    return teams.reduce((leaderboard, team) => {
      const allStats = matches.filter(
        (match) => team.id === match.homeTeamId || team.id === match.awayTeamId,
      );
      const leaderboardBuilder = new Leaderboard(allStats, team.id);
      leaderboard.push(this.buildTeamsPerformances(
        team.teamName,
        leaderboardBuilder,

        allStats.length,
      ));
      return leaderboard;
    }, [] as ITeamPerformance[]);
  }

  public async getAllTeamsPerformance(): Promise<ServiceResponse<ITeamPerformance[]>> {
    this.leaderboard = await this.createAllTeamsLeaderboard();
    return { status: 'SUCCESSFUL', data: this.buildTeamsClassification() };
  }

  private buildTeamsPerformances =
  (name: string, leaderboardBuilder: Leaderboard, totalGames: number): ITeamPerformance => ({
    name,
    totalPoints: leaderboardBuilder.totalPoints,
    totalGames,
    totalVictories: leaderboardBuilder.totalVictories,
    totalDraws: leaderboardBuilder.totalDraws,
    totalLosses: leaderboardBuilder.totalLosses,
    goalsFavor: leaderboardBuilder.goalsFavor,
    goalsOwn: leaderboardBuilder.goalsOwn,
    goalsBalance: leaderboardBuilder.goalsBalance,
    efficiency: leaderboardBuilder.efficiency,
  });

  private buildTeamsClassification(): ITeamPerformance[] {
    const sortingParams: (keyof ITeamPerformance)[] = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor',
    ];

    return this.leaderboard
      .slice()
      .sort((a, b) => {
        const sortedParam = sortingParams.find((param) =>
          a[param] !== b[param]) as keyof ITeamPerformance;
        return +(b[sortedParam] || 0) - +(a[sortedParam] || 0);
      });
  }
}
