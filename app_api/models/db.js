var mongoose = require('mongoose');

var dbUri = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
  dbUri = process.env.MONGOLAB_URI;
}
mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbUri);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection errror ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./locations');
