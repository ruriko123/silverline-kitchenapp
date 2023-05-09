"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
var admin = require("firebase-admin");
exports.admin = admin;
const serviceaccount = require("../../../firebaseconfig.json");
admin.initializeApp({
    credential: admin
        .credential
        .cert(serviceaccount)
});
