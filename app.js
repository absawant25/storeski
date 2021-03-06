var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");
var mongoose = require("mongoose");
var expressValidator = require("express-validator");

var auth = require('./auth/routes');
var passport = require('passport');


//var routes = require('./routes/index');
var users = require('./users/routes');
var router = express.Router();

var config = require('./config');

try {
  var app = express();
} catch (e) {
  console.log(e);
}

app.set('dbUrl', config.db[app.settings.env]);
//mongoose.connect(app.get('dbUrl'));

var server = http.createServer(app);

app.set("port", process.env.PORT || 3000);
app.listen(3000);
console.log("The magic happens on port : " + app.get('port'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/add/:first/:second', function (req, res, next) {

  var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
  res.status(200).send(String(sum));

});

app.post('/signup', users.signup);

app.post('/auth/local', auth.local);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports.app = app;
