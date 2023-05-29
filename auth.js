const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const database = require('./database');
            const user = await database.findUserById(id);
            console.log(user);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'senha'
    },
        async (username, password, done) => {
            try {
                const database = require('./authUser');
                const user = await database.findUser(username);
                console.log(user);

                // usuário inexistente
                if (!user) { return done(null, false) }

                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false)

                return done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    ));
}