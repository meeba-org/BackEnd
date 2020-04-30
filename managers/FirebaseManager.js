const fbAdmin = require("firebase-admin");

fbAdmin.initializeApp({
    credential: fbAdmin.credential.applicationDefault(),
    databaseURL: "https://meeba-dev.firebaseio.com"
});

const createUser = user =>
    fbAdmin.auth().createUser({
        uid: user._id,
        email: user.email
    });

module.exports = {
    fbAdmin
    , createUser
};
