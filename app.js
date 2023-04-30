var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Rotas do Sistema

const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const router404 = require('./routes/404');
const materiaisRouter = require('./routes/material');
const mesaRouter = require('./routes/mesa');
const contaRouter = require('./routes/conta');
const aboutRouter = require('./routes/about');
const settingRouter = require('./routes/settings');
const relatorioRouter = require('./routes/relatorio');

//Fim Rotas do Sistema

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', router404);
app.use('/', materiaisRouter);
app.use('/', mesaRouter);
app.use('/', contaRouter);
app.use('/', settingRouter);
app.use('/', relatorioRouter);
app.use('/', aboutRouter);

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
