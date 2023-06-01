var database = require('./database');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username,password,done)=>{

  database("usuarios")
  .where("username", username)
  .first()
  .then((user)=>{
    if(!user || user.password !== password){
      console.log(user);
        return done(null, false);
    }
    done(null, user)

  }, done);
}));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  database("usuarios")
  .where("id", id)
  .first()
  .then((user)=>{
    done(null, user)
  },done);
})
