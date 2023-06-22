const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const { client } = require('../models/index');
require('dotenv').config();
const { comparePwd } = require('../controllers/ClientController')
const jwt = require('jsonwebtoken');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await client.findOne({ where: { email } });

        if (!user) {
          return done(null, false, {message: 'Email inválido'})
        }

        const isPasswordValid = await comparePwd(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Senha incorreta' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
    new BearerStrategy(
      async (token, done) => {
        try {

            const body = await jwt.verify(token, process.env.CHAVE_JWT);
          
  
          if (!body) {
            return done(null, false);
          }
  
          // Autenticação bem-sucedida, retornar o usuário
          return done(null, body);
        } catch (error) {
          return done(`Token inexistente ou expirado`);
        }
      }
    )
  );

module.exports = passport;