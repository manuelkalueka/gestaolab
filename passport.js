const bcrypt = require('bcryptjs');
var database = require('./database');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {

  await database("usuarios")
    .where("username", username)
    .first()
    .then((user) => {

      if (!user) {
        //console.log(user);
        return done(null, false);//usuario nao encontrado
      }
      // comparando as senhas
      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        return done(null, false);
      }

      return done(null, user)

    }, done);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await database("usuarios")
    .where("id", id)
    .first()
    .then((user) => {
      done(null, user)
    }, done);
})
