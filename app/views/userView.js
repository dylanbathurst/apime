exports.formatUserObject = formatUserObject;

function formatUserObject(bundle) {
  var view = {},
      twitter = bundle.twitter[0],
      gravatar = bundle.gravatar.entry[0];

  view.name = twitter.name
  view.usernames = [twitter.screen_name, 'Dylan B.'];
  view.avatars = [{twitter: twitter.profile_image_url}, {gravatar: gravatar.thumbnailUrl}];
  view.bio = twitter.description;
  view.website = twitter.url;
  view.socialnetworks = [
    {website: 'Twitter', url: 'http://www.twitter.com/' + twitter.screen_name},
    {website: 'Facebook', url: 'http://www.facebook.com/' + twitter.screen_name},
    {website: 'Foursquare', url: 'http://foursquare.com/' + twitter.screen_name},
    {website: 'LinkedIn', url: 'http://www.linkedin.com/in/' + twitter.screen_name}
  ];

  return view;
}
