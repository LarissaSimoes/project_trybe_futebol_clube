import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import { team, teams } from './mocks/TeamsMock';
import { validUser, validLogin, invalidEmailLogin, invalidPasswordLogin, user } from './mocks/UsersMock';
import UsersService from '../services/UserService';
import { Response } from 'superagent';
import UsersModel from '../models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
  afterEach(function() {
    sinon.restore();
  });
  it('deve retornar status 401 se a senha for inválida', async function() {
    const response = await chai.request(app).post('/login').send(invalidPasswordLogin);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });


  it('deve retornar status 401 se o e-mail for inválido', async function() {
    const response = await chai.request(app).post('/login').send(invalidEmailLogin);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('deve retornar status bad request se a senha não for enviada', async function() {
    const { status, body } = await chai.request(app).post('/login').send({
        "email": "validEmail@teste.com",
        "password": ""
    })
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('deve retornar status bad request se o e-mail não for enviado', async function() {
    const { status, body } = await chai.request(app).post('/login').send({
        "email": "",
        "password": "secret_admin"
    })
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('deve retornar status 401 se o token for incorreto', async function() {
    sinon.stub(SequelizeUsersModel, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });   
    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('deve retornar user role', async function () {
    sinon.stub(SequelizeUsersModel, 'findOne').resolves(user as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + token);
    expect(status).to.equal(200);
    expect(body).to.have.key('role');
  });

  it('deve retornar status 401 se o token não for passado', async function () {
    const { status, body } = await chai.request(app).get('/login/role')
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('deve retornar status 401 se o token estiver incorreto', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + 'wrong_token');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

});
