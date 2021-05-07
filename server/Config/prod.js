//prod.js 

module.exports = {
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    gmailPass: process.env.GMAIL_PASS,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    
 };

