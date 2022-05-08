var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
const routes = require('./routes');
var os = require('os');
//console.log(os.cpus(),os.cpus().length);
UV_THREADPOOL_SIZE = os.cpus().length;
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  res.status(error.status || 500);
  res.json({
    error: { message:error.message}
  });
  console.log(error.message);
});


module.exports = app;
