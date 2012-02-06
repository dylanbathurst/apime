var httpRequester = require(__dirname + '/../../lib/httpRequester'),
    cradle        = require('cradle'),
    async         = require('async');

var User = exports;

exports.getPublicUserProfileByName = getPublicUserProfileByName;
exports.getUserInfo = getUserInfo;
exports.getGravatarProfile = getGravatarProfile;
exports.getUserBioByName = getUserBioByName;


function getPublicUserFromDatbaseByName(username, callback) {}


function createNewUserByName(username, callback) {}

function getUserInfo(username, callback) {
  var c = new(cradle.Connection)(process.env.DB, 5984, {
    cache: true,
    raw: false
  });

  var dbUsers = c.database('apime-users');
  var dbTwitter = c.database('apime-twitter');
  var dbFacebook = c.database('apime-facebook');
  var id = '0a1ce95bffd68efeb40f57b98c0007e1';

  async.series([
    dbUsers.get.bind(dbUsers, id),
  ], function (err, user) {
    var userId = user[0].userId;

    dbTwitter.get(userId, function (err, twitterInfo) {
      var mix = user.concat(twitterInfo);

      callback(null, mix);
    });
  });

  // db.get(id, function (err, res) {
  //   if (err) throw err;

  //   callback(null, res);
  // });
}

function getPublicUserProfileByName(username, callback) {
  async.parallel({
    gravatar: User.getGravatarProfile.bind(User, username),

    twitter: User.getUserBioByName.bind(User, username)
  }, callback);
}


function getGravatarProfile(username, callback) {
  var path = '/' + username + '.json';

  httpRequester.get({
    host: 'en.gravatar.com',
    path: path
  }, {}, callback);
}


function getUserBioByName(username, callback) {
  var path = '/1/users/lookup.json?screen_name=' + username;

  httpRequester.get({
    host: 'api.twitter.com',
    path: path
  }, {}, callback);
}
