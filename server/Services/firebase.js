var admin = require("firebase-admin");

var serviceAccount = require('../Config/serviceAccountKeys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://e-tutor-9f2c2.appspot.com'
});

