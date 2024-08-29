var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// bắt đầu code từ đoạn này
// đoạn này dùng để import 
var indexRouter = require('./routes/index');
const database = require('./config/db');
const apiRouter = require('./routes/api')
const cors = require('cors')

const Books = require('./routes/Books')
const users = require('./routes/users')
require('./models/userModel')
const products = require('./routes/products')
const categories = require('./routes/categories')
// đến đây


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// và code từ đoạn này trở xuống
app.use('/', indexRouter);
database.connect()
app.use('/api',apiRouter)
app.use('/books',Books)
app.use('/users',users)
app.use('/products',products)
app.use('/categories',categories)
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
