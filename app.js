var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var createRouter = require('./routes/create');
var mainRouter = require('./routes/main');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'DONT TELL ANYONE',
  cookie: { maxAge: 60 * 1000 }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',loginRouter);
app.use('/login',loginRouter);
app.use('/create',createRouter);
app.use('/register',registerRouter);
app.use('/main',mainRouter);
app.use('/logout',logoutRouter);
app.get('/hello',function(req,res) {

  res.send('This is testing hello world');

});
// app.get('/',function(req,res){

//   res.redirect('login');

// })
// app.get('/create',function(req,res){
//   res.send('This is create page');
//   console.log('create');
  
// });
// app.get('/update',function(req,res){
//   res.send('this is update page');
//   console.log('update');
  
// });
// app.get('/delete',function(req,res){
//   res.send('this is delete page');
//   console.log('delete');
  
// });



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
