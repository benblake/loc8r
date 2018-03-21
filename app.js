require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

// generate minified js file for angular app
var appClientFiles = {
  'app_client/app.js': fs.readFileSync('app_client/app.js', "utf8"),
  'app_client/home/home.controller.js': fs.readFileSync('app_client/home/home.controller.js', "utf8"),
  'app_client/auth/register/register.controller.js': fs.readFileSync('app_client/auth/register/register.controller.js', "utf8"),
  'app_client/auth/login/login.controller.js': fs.readFileSync('app_client/auth/login/login.controller.js', "utf8"),
  'app_client/about/about.controller.js': fs.readFileSync('app_client/about/about.controller.js', "utf8"),
  'app_client/locationDetail/locationDetail.controller.js': fs.readFileSync('app_client/locationDetail/locationDetail.controller.js', "utf8"),
  'app_client/reviewModal/reviewModal.controller.js': fs.readFileSync('app_client/reviewModal/reviewModal.controller.js', "utf8"),
  'app_client/common/services/loc8rData.service.js': fs.readFileSync('app_client/common/services/loc8rData.service.js', "utf8"),
  'app_client/common/services/geolocation.service.js': fs.readFileSync('app_client/common/services/geolocation.service.js', "utf8"),
  'app_client/common/services/authentication.service.js': fs.readFileSync('app_client/common/services/authentication.service.js', "utf8"),
  'app_client/common/directives/ratingStars/ratingStars.directive.js': fs.readFileSync('app_client/common/directives/ratingStars/ratingStars.directive.js', "utf8"),
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js': fs.readFileSync('app_client/common/directives/footerGeneric/footerGeneric.directive.js', "utf8"),
  'app_client/common/directives/navigation/navigation.directive.js': fs.readFileSync('app_client/common/directives/navigation/navigation.directive.js', "utf8"),
  'app_client/common/directives/navigation/navigation.controller.js': fs.readFileSync('app_client/common/directives/navigation/navigation.controller.js', "utf8"),
  'app_client/common/directives/pageHeader/pageHeader.directive.js': fs.readFileSync('app_client/common/directives/pageHeader/pageHeader.directive.js', "utf8"),
  'app_client/common/filters/formatDistance.filter.js': fs.readFileSync('app_client/common/filters/formatDistance.filter.js', "utf8"),
  'app_client/common/filters/addHtmlLineBreaks.filter.js': fs.readFileSync('app_client/common/filters/addHtmlLineBreaks.filter.js', "utf8")
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

app.use(passport.initialize());

app.use('/api', routesApi);

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message": err.name + ": " + err.message});
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
