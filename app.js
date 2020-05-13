// npm module imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');

// application module imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let booksRouter = require('./routes/books');

// database setup
console.log('<<-- Initiating Mongoose Test -->>');

let connectiong_string = 'mongodb://127.0.0.1:27017/my_personal_library?retryWrites=true&w=majority';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose.connect(connectiong_string)
    .then(() => {
        console.log('<<-- The MongoDB connection was successful -->>');

    })
    .catch((err) => {
        console.log('Connection Failure: An error has occurred - error ', err);
    });

var app = express();

// create redirect
app.get('/book', (req, res, next) => {
  res.redirect(301, '/books');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

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
