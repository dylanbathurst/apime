var mu = require('mu2');

mu.root = __dirname + '/../app/templates/';

exports.template = function (template, view) {
  var filename = template + '.html'
  
  if (process.env.CACHE_TEMPLATES == 'NO') {
    mu.clearCache();
  }
  
  return mu.compileAndRender(filename, view);
};

