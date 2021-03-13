const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const SessionCookie = require('cookie-session');
const morgan = require('morgan');


// require('./Models/user');

const keys = require('./Config/keys');

// require('./Services/firebase');
// require('./Services/passport');

const app = express();

// MIDDLEWARES
// app.use(cors({
// 	methods:['GET','POST'],
// 	credentials: true,
// 	origin: '*',
//   }))

// app.use(function (req, res, next) {
// 	if (req.secure) {
// 			// request was via https, so do no special handling
// 			next();
// 	} else {
// 			// request was via http, so redirect to https
// 			res.redirect('https://' + req.headers.host + req.url);
// 	}
// });

mongoose.connect(keys.mongoURI);

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ');
});

// On Error
mongoose.connection.on('error', err => {
	console.log('Database error: ' + err);
});

app.use(cookieParser('anything')) 
app.use(
	SessionCookie({
		//secret: 'super secret',
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
		keys: [keys.cookieKey],
		//secure: false,
	})
);

// app.use(session({ 
// secret: 'super secret',
// resave: false,
// saveUninitialized: false,
// maxAge: 30 * 24 * 60 * 60 * 1000, //30 days

// }));

 //Must inorder to receive post request in req.body object
 app.use(express.static(__dirname));
 app.use(bodyParser.json({limit: '50mb'}));
 app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//authRoute return a function with app (express app) argument
require('./Routes/authRoutes')(app);
// require('./Routes/dashboardRoutes')(app);
// require('./Routes/forgotPassRoutes')(app);

const PORT = process.env.PORT || 5000;


app.listen(PORT);