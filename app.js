var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
require('./passport');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');//função do Cors ToDo

//Rotas do Sistema
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const materiaisRouter = require('./routes/material');
const mesaRouter = require('./routes/mesa');
const contaRouter = require('./routes/perfil');
const aboutRouter = require('./routes/about');
const settingRouter = require('./routes/settings');
const relatorioRouter = require('./routes/relatorio');
const extrasRouter = require('./routes/extras');
const router404 = require('./routes/404');
//Fim Rotas do Sistema

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

//configuracao das sessoes e autenticacao de usuario
app.use(session({
  secret: 'gestao do laboratorio de informatica',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 45 * 60 * 1000 }//45min
}));

app.use(passport.initialize());
app.use(passport.session());
//fim autenticacao

app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', materiaisRouter);
app.use('/', mesaRouter);
app.use('/', contaRouter);
app.use('/', settingRouter);
app.use('/', relatorioRouter);
app.use('/', aboutRouter);
app.use('/', extrasRouter);
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
