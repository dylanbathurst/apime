require('./config');

var express = require('express'),
    cradle  = require('cradle');

var app = exports.http = express.createServer();

var db =  new(cradle.Connection)('dylan.couchone.com', 5984, {});

// Configuration
app.configure(function(){
  app.use(express.logger());
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(require(__dirname + '/lib/middleware/write_stream'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// setup models
['user'].forEach(function (name) {
  require(__dirname + '/app/models/' + name).setDatabase(db);
});

// Routes
['root', 'user'].forEach(function (name) {
  app.use(require(__dirname + '/app/controllers/' + name));
});

