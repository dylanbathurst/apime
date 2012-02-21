var db;

var httpRequester = require(__dirname + '/../../lib/httpRequester'),
    cradle        = require('cradle'),
    async         = require('async');

var User = exports;

exports.setDatabase = setDatabase;
exports.findByUserId = findByUserId;
exports.findByUserName = findByUserName;
exports.getPublicUserProfileByName = getPublicUserProfileByName;
exports.getGravatarPublicProfile = getGravatarPublicProfile;
exports.getTwitterPublicProfile = getTwitterPublicProfile;

function setDatabase(database) {
  db = database;
  db.name = function (dbName) {
    return db.database(dbName);
  };
}

function findByUserId(id, callback) {
  db.get(id, callback);
}


function findByUserName(username, callback) {
  db.name('apime-users')
    .view('user/byUsername', {key: username}, function (err, user) {
    if (err) return callback(err);

    callback(null, user.rows[0].value);
  });
}


function getPublicUserProfileByName(username, callback) {
  async.parallel({
    twitter: User.getTwitterPublicProfile.bind(User, username),

    gravatar: User.getGravatarPublicProfile.bind(User, username)
  }, function (err, bundle) {
    if (err) return callback(err);

    if (bundle.twitter.errors) {
      if (bundle.gravatar != 'User not found') {
        bundle.found = 'gravatar';
        return callback(null, bundle);
      } else {
        return callback({error: 'User not found'});
      }
    } else {
      bundle.found = 'twitter';
      callback(null, bundle);
    }
  });
}


function getGravatarPublicProfile(username, callback) {
  var path = '/' + username + '.json';

  httpRequester.get({
    host: 'en.gravatar.com',
    path: path
  }, {}, callback);
}


function getTwitterPublicProfile(username, callback) {
  var path = '/1/users/lookup.json?screen_name=' + username;

  httpRequester.get({
    host: 'api.twitter.com',
    path: path
  }, {}, callback);
}
