var http = require('http'),
    queryString = require('querystring');

var httpRequester = exports;

exports.get  = get;
exports.post = post;
exports.put  = put;
exports.del  = del;

function get(options, queryParams, callback) {
  httpRequest('GET', options, null, function (err, response) {
    if (err) return callback(err);  
    
    callback(null, response);
  });
}

function post(options, body, callback) {
  httpRequest('POST', options, body || {}, function (err, response) {
    if (err) return callback(err);  
    
    callback(null, response);
  });
}

function put(options, body, callback) {
  httpRequest('PUT', options, body || {}, function (err, response) {
    if (err) return callback(err);  
    
    callback(null, response);
  });
}

function del(options, body, callback) {
  httpRequest('DELETE', options, body || {}, function (err, response) {
    if (err) return callback(err);  
    
    callback(null, response);
  });
}

// private helper function
function httpRequest(method, options, body, callback) {
  var httpOptions = {
    host:   options.host,
    port:   80,
    path:   options.path,
    method: method,
    headers: {}
  },
      buffer  = '';

  if (method === 'POST') {
    httpOptions.headers["content-type"] = "application/json";
  }

  var req = http.request(httpOptions, function (res) {
    res.on('data', function(chunk) {
      buffer += chunk;
    })
    .on('end', function() {
      callback(null, JSON.parse(buffer));
    });    
  });

  req.on('error', function (err) {
    callback(err);    
  });

  if (body) {
    req.write(JSON.stringify(body));
  } 

  req.end();
}

