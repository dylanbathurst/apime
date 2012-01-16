var httpRequester = require(__dirname + '/../../lib/httpRequester'),
    /* cradle        = require('cradle'), */
    async         = require('async');


// var c = new(cradle.Connection)('dylan.couchone.com', 5984, {
//   cache: true,
//   raw: false
// });
// 
// var db = c.database('apime');
// var id = 'f14c2c7fef21f7e5623b16207a000a9d';
// 
// var newness = {'dool': 'garl'};
// 
// db.merge(id, newness, function (err, res) {
//   if (err) throw err;
// 
//   console.log(res);
// });

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
