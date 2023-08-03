import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Leaderboard', () => {

    afterEach(function() {
        sinon.restore();
      });

  it('Testando Leaderboard - classificação geral dos times', async function (){
    const { status, body } = await chai.request(app).get('/leaderboard');
    expect(status).to.eq(200);
  });

  it('Leaderboard Home - informações do desempenho dos times da casa', async function (){
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.eq(200);
  });

  it('Leaderboard Away - informações do desempenho dos times visitantes', async function (){
    const { status, body } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.eq(200);
  });
});