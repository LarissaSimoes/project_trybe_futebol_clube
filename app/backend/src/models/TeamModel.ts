import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { ITeams, TeamsModelType } from '../Interfaces/Iteams';

export default class TeamModel implements TeamsModelType {
  private model = SequelizeTeamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
