var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = 'ACd8ba9bdc20fdad9142dc917c8d0893de';
var API_KEY_SID = 'SKb217d7eb058ac3b287d2253d7bef101e';
var API_KEY_SECRET = 'BkShs7T9a4lex6eDLVDBvocGqlBsYzs4';

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// Set the Identity of this token
accessToken.identity = 'fahadeez';

// Grant access to Video
var grant = new VideoGrant();
grant.room = 'cool room';
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();
console.log(jwt);