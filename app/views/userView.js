var response = require('../../lib/response');

exports.formatUserProfile = formatUserProfile;
exports.twitterOptions    = twitterOptions;
exports.gravatarOptions   = gravatarOptions;


function formatUserProfile (view, bundle) {
  view.twitter = twitterOptions(bundle.twitter[0]);
  view.gravatar = gravatarOptions(bundle.gravatar.entry[0]);

  return response.template('user', view);
}


function twitterOptions(bundle) {
  var options = {};

  options.username = bundle.screen_name;
  options.bio = bundle.description;
  options.photo = bundle.profile_image_url;
  options.website = bundle.url;

  return options;
}

function gravatarOptions(bundle) {
  var options = {};

  options.username = bundle.preferredUsername;
  options.bio = bundle.aboutMe;
  options.photo = bundle.thumbnailUrl;
  options.website = bundle.urls;

  return options;
}
