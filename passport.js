const database = require('./database');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    database('usuarios').
        where("username", username)
        .first()
        .then((user) => {
            if (!user || user.senha !== password) {
                return done(null, false);
            }
            done(null, user);//usuario existente
        }, done);
}));

//criacao de cookie para o front-end
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//pesquisa o id do cookie na db
passport.deserializeUser((id, done) => {
    database('usuarios')
        .where("id", id)
        .first()
        .then((user) => {
            done(null, user);
        }, done);
});

module.exports = passport;