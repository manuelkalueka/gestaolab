const database = require('./database');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {//instancia o objecto strategy com dos dados de login em Callback
    database("usuarios")
        .where("username", username)//verifica o usuario na base de dados
        .first()
        .then((user) => {
            /** LOGICA DE LOGIN NECESSARIA AQUI */
            if (!user || user.senha !== password) {
                return done(null, false) // Falha de autenticacao
            }

            done(null, user);
        }, done);
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})//funcao responsavel por passar dados de sessao no cookie

passport.deserializeUser((id, done) => {// pega o id do cookie  no cliente e resgata na db
    database("usuarios")
        .where("id", id).
        first()
        .then((user) => {
            done(null, user)
        }, done);

})