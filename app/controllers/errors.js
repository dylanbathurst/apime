var express = require('express');
    

module.exports = function (app) {
  app.all('*', function (req, res) {
    res.json({error: {msg: "Not Found"}}, 404);
  });

  app.error(function(err, req, res, next) {
    if (err.headers) {
      for (var name in err.headers) {
        res.header(name, err.headers[name]);
      }
    }

    if (err.json) {
      if (err.statusCode) {
        res.json({error: err.json}, err.statusCode);
      } else {
        res.json({error: err.json}, 500);
      }
    } else {
      next(err);
    }
  });

  app.error(function(err, req, res, next) {
    if (err.message != 'test') {
      if (err.stack) {
        console.error('500 Error:', err.stack);
      } else {
        console.error('500 Error:', err);
      }
    }

    res.json({error: {msg: "Internal Server Error"}}, 500);
  });
}

