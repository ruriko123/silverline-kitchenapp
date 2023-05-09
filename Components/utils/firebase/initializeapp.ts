var admin = require("firebase-admin");
const serviceaccount = require("@base/firebaseconfig.json");

admin.initializeApp({
    credential: admin
        .credential
        .cert(serviceaccount)
});


export {admin};
