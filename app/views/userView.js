exports.formatUserObject = formatUserObject;

function formatUserObject(bundle) {
  var view = {},
      twitter = bundle.twitter[0],
      gravatar = bundle.gravatar.entry[0];

  view.Name = twitter.name
  view.Username = twitter.screen_name;
  view.Avatars = [{Twitter: twitter.profile_image_url}, {Gravatar: gravatar.thumbnailUrl}];
  view.Bio = twitter.description;
  view.Website = twitter.url;
  view.SocialNetworks = [
    {Website: 'Twitter', Url: 'http://www.twitter.com/' + twitter.screen_name},
    {Website: 'Facebook', Url: 'http://www.facebook.com/' + twitter.screen_name}
  ];

  return view;
}
