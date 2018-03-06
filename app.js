var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var uglifyJs = require('uglify-js');
var fs = require('fs');

var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// generate minified js file for angular app
var appClientFiles = {
  'app_client/app.js': fs.readFileSync('app_client/app.js', "utf8"),
  'app_client/home/home.controller.js': fs.readFileSync('app_client/home/home.controller.js', "utf8"),
  'app_client/common/services/loc8rData.service.js': fs.readFileSync('app_client/common/services/loc8rData.service.js', "utf8"),
  'app_client/common/services/geolocation.service.js': fs.readFileSync('app_client/common/services/geolocation.service.js', "utf8"),
  'app_client/common/directives/ratingStars/ratingStars.directive.js': fs.readFileSync('app_client/common/directives/ratingStars/ratingStars.directive.js', "utf8"),
  'app_client/common/filters/formatDistance.filter.js': fs.readFileSync('app_client/common/filters/formatDistance.filter.js', "utf8")
};

var minified = uglifyJs.minify(appClientFiles, {compress: false});

fs.writeFile('public/angular/loc8r.min.js', minified.code, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: loc8r.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/', index);
app.use('/users', users);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
