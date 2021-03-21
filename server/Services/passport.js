const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const keys = require('../Config/keys');

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: keys.googleClientID,
// 			clientSecret: keys.googleClientSecret,
// 			callbackURL: '/auth/google/callback',
// 			passReqToCallback: true,
// 			//proxy: true,
// 			// because without proxy = true Gstrategy is converting our route to http
// 			//and we want https it also handles heroku proxy
// 		},

// 		async (req, accessToken, refreshToken, profile, done) => {
// 			const existingUser = await User.findOne({ googleID: profile.id });
// 			if (existingUser) {
// 				//done receive 2 arguments first error 2nd record
// 				done(null, existingUser);
// 			} else {
// 				//	User is just an instance of mongoose model class which is beign saved
// 				//	into the mongoDB database
// 				const user = await new User({
// 					googleID: profile.id,
// 					firstName: profile.name.givenName,
// 					lastName: profile.name.familyName,
// 					email: profile.emails[0].value,
// 					imgUrl: profile.photos[0].value+"-s500",
// 				}).save();
// 				done(null, user);
// 			}
// 		}
// 	)
// );

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
   	passReqToCallback: true,
  },
  function(req , email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err){
        return done(err);
	  }
	  
      if(!user){
        console.log("No User found");
        return done(null, false);
      }
      if(!user.comparePassword(password, user.password)){
        console.log("Password was incorrect");
        return done(null, false);
	  }
	  
      console.log("User was found");
      done(null, user);
    });
  }
));
// passport.use(new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password'
// },
// function (email, password, cb) {
// 	//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
// 	return User.findOne({email, password})
// 	   .then(user => {
// 		   if (!user) {
// 			   return cb(null, false, {message: 'Incorrect email or password.'});
// 		   }
// 		   return cb(null, user, {message: 'Logged In Successfully'});
// 	  })
// 	  .catch(err => cb(err));
// }
// ));
