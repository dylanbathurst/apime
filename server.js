require('./config');

var express = require('express');

var app = exports.http = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.logger());
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
['root', 'user'].forEach(function (name) {
  app.use(require(__dirname + '/app/controllers/' + name));
});

