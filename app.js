var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');//função do Cors ToDo
const session = require('express-session');
var passport = require('passport');
require('./passport');
//Verificar autenticacao, caso sim continue, caso nao volta no login com falha
function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

//Data


//Rotas do Sistema
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const materiaisRouter = require('./routes/material');
const mesaRouter = require('./routes/mesa');
const contaRouter = require('./routes/perfil');
const aboutRouter = require('./routes/about');
const settingRouter = require('./routes/settings');
const relatorioRouter = require('./routes/relatorio');
const usuariosRouter = require('./routes/usuarios');
const router404 = require('./routes/404');
//Fim Rotas do Sistema

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configuracao das sessoes e autenticacao de usuario
app.use(session({
  secret: 'gestao do laboratorio de informatica',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 90 * 60 * 1000 }//1h30 de duracao
}));

app.use(passport.initialize());
app.use(passport.session());
//fim autenticacao

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// true evita object null
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Metodo override para identificar o put e o delete*/
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
// Fim metodo override

app.use(cors());//estudar o USO

app.use('/', loginRouter);
app.use('/', authenticationMiddleware, dashboardRouter);
app.use('/', authenticationMiddleware, materiaisRouter);
app.use('/', authenticationMiddleware, mesaRouter);
app.use('/', authenticationMiddleware, contaRouter);
app.use('/', authenticationMiddleware, settingRouter);
app.use('/', authenticationMiddleware, relatorioRouter);
app.use('/', authenticationMiddleware, aboutRouter);
app.use('/', authenticationMiddleware, usuariosRouter);
app.use('/', router404);//manter o erro de não encontrado em ultimo

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
