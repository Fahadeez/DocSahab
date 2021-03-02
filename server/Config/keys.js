//figure out what set of keys to deliver

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}

//remeber password for mongouri is that particular users password and not your account password 
