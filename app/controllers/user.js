var express  = require('express');
var userView = require(__dirname + '/../views/userView');

var User = require(__dirname + '/../models/user');

var app = module.exports = express.createServer();

app.get('/?:username', function (req, res, next) {
  var username = req.params.username;

  User.getPublicUserProfileByName(username, function (err, bundle) {
    if (err) throw err;

    switch (bundle.found) {
      case 'twitter':
        var out = userView.twitterOptions(bundle.twitter[0]);
      break;
      case 'gravatar':
        var out = userView.gravatarOptions(bundle.gravatar.entry[0]);
      break;
    }

    res.json(out);
  });
});


app.get('/?:username/edit', function (req, res, next) {
  var username = req.params.username;

  User.getPublicUserProfileByName(username, function (err, bundle) {
    if (err) throw err;

    var out = userView.formatUserProfile({username: username}, bundle);
    res.writeStream(out);
  });
});
