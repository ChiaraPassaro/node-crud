var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//inserisco handlebars
var hbs  = require('express-handlebars');

//Inserisco Mysql
var mysql = require('mysql');

const db = mysql.createConnection ({
  //localhost non funziona
  host: '127.0.0.1',
  user: 'root',
  password: 'Barbara_73',
  database: 'hotel_booleana',
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

global.db = db;

//richiamo index
var indexRouter = require('./routes/index');

var app = express();

//  setup di handlebars
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//uso la route
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
