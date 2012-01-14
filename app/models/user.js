var httpRequester = require('lib/httpRequester'),
    async         = require('async');

var User = exports;

exports.getPublicUserProfileByName = getPublicUserProfileByName;
exports.getGravatarProfile = getGravatarProfile;
exports.getUserBioByName = getUserBioByName;


function getPublicUserFromDatbaseByName(username, callback) {}


function createNewUserByName(username, callback) {}


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
