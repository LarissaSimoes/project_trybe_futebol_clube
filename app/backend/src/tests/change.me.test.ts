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
});
