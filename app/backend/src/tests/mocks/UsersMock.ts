import * as bcrypt from 'bcryptjs';

const validUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const invalidEmailLogin = {
    email: 'invalidEmail',
    password: 'password',
};

const invalidPasswordLogin = {
    email: 'admin@admin.com',
    password: '000',
};

const validLogin = {
    email: 'admin@admin.com',
    password: 'super_secret',
};

const HASHING_ROUNDS = process.env.BCRYPT_HASHING_ROUNDS || 10;

const user = {
    id: 1,
    username: 'Larissa',
    role: 'admin',
    email: 'larissa@admin.com',
    password: bcrypt.hashSync('super_secret', HASHING_ROUNDS),
  };

export { validUser, validLogin, invalidEmailLogin, invalidPasswordLogin, user };
