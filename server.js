
require.paths.unshift(__dirname);
require.paths.unshift(__dirname + '/app');

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
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
  app.use(require('controllers/' + name));
});

app.listen(8000);
