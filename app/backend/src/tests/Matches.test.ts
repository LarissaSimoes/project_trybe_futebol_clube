import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import { Response } from 'superagent';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { matchesMock, finishedMatchesMock, matchesInProgressMock, matchToBeFinished, updateMatchBody, matchToBeUpdated } from './mocks/MatchesMock';
import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import { validUser, validLogin, invalidEmailLogin, invalidPasswordLogin, user } from './mocks/UsersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  afterEach(function() {
    sinon.restore();
  });

  it('a rota deve retornar uma lista de partidas', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('A rota deverá retornar uma lista de partidas filtradas e neste caso as partidas finalizadas', async function (){
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(finishedMatchesMock as any);
    const { status, body } = await chai.request(app).get('/matches/?inProgress=false');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(finishedMatchesMock);
  });

  it('A rota deverá retornar uma lista de partidas filtradas e neste caso as partidas em andamento', async function (){
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matchesInProgressMock as any);
    const { status, body } = await chai.request(app).get('/matches/?inProgress=true');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(matchesInProgressMock);
  });

  it('deve ser possível finalizar uma partida no banco de dados', async function () {
    sinon.stub(SequelizeUsersModel, 'findOne').resolves(user as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);
    sinon.stub(SequelizeMatchesModel, 'findOne').resolves(matchToBeFinished as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'Bearer ' + token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('deve ser possível atualizar partidas em andamento', async function () {
    sinon.stub(SequelizeUsersModel, 'findOne').resolves(user as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);
    sinon.stub(SequelizeMatchesModel, 'findOne').resolves(matchToBeUpdated as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .send(updateMatchBody)
      .set('Authorization', 'Bearer ' + token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Match updated' });
  });

});
