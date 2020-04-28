const fbAdmin = require("firebase-admin");

fbAdmin.initializeApp({
    credential: fbAdmin.credential.applicationDefault(),
    databaseURL: "https://meeba-dev.firebaseio.com"
});

module.exports = {
    fbAdmin
};
