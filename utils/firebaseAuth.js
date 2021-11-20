var admin = require("firebase-admin");

var serviceAccount = require("../.secrets/kantiinit-firebase-adminsdk-gn0gg-eb9396ffae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function isUserTokenValid(token) {
    if(admin.auth().verifyIdToken(token)) {
        return true;
    } else {
        return false;
    }
}

function getUID(token) {
    return admin.auth().verifyIdToken(token).then((decodedToken) => {
        return decodedToken.uid;
    })
}

module.exports = {
    isUserTokenValid,
    getUID
};

