import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { team, teams } from './mocks/TeamsMock';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  afterEach(function() {
    sinon.restore();
  });
  it('deve retornar todos os times', async function() {
    sinon.stub(SequelizeTeamsModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('deve retornar um time pelo id', async function() {
    sinon.stub(SequelizeTeamsModel, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
  it('deve retornar NOT FOUND se o time não existir', async function() {
    sinon.stub(SequelizeTeamsModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/100');

    expect(status).to.equal(404);
    expect(body.message).to.equal('null');
  });
});
