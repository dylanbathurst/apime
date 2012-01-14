var express  = require('express');
var userView = require('views/userView');

var User = require('models/user');

var app = module.exports = express.createServer();

app.get('/?:username', function (req, res, next) {
  var username = req.params.username;

  User.getPublicUserProfileByName(username, function (err, user) {
    if (err) throw err;

    res.json(userView.formatUserObject(user));
  });
});

app.post('/users/:username', function (req, res, next) {
  var username = req.params.username,
      body = req.body;

  User.createNewUserByName(username, body, function (err, response) {
    if (err) throw err;

    res.json(response);
  });
});
