var express = require('express');
var userView = require(__dirname + '/../views/userView');

var User = require(__dirname + '/../models/user');

var app = module.exports = express.createServer();

app.get('/', function (req, res, next) {

  var username = 'dylanbathurst';

  User.getPublicUserProfileByName(username, function (err, user) {
    if (err) return next(err);

    res.json({ 'Welcome': 'to ApiMe', 'What is this?': 'Have you ever wanted your own API that\'s all about you? Well here you are! Just put your Twitter, Facebook, Gravatar, or Foursquare username after a forward slash in the address bar to get started' });
  });
});
