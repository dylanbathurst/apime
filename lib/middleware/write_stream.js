var util = require('util');

module.exports = writeStream;

function writeStream(req, res, next) {
  res.writeStream = function (stream, statusCode, headers) {
    statusCode = statusCode || 200
    headers = headers || {
      'content-type': 'text/html'
    };
    
    res.writeHead(statusCode, headers);
    util.pump(stream, res);
  };
  
  next();
}

