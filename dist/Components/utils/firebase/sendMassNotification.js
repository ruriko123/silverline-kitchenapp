"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMassNotification = void 0;
const initializeapp_1 = require("./initializeapp");
const sendMassNotification = (tokens, title, body) => {
    var _a;
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    const message_notification = {
        notification: {
            title: title,
            body: body
        }
    };
    let tokenarray = [];
    for (let k in tokens) {
        let firebasetoken = (_a = tokens[k]) === null || _a === void 0 ? void 0 : _a.firebaseToken;
        if (firebasetoken) {
            tokenarray.push(firebasetoken);
        }
        ;
    }
    ;
    for (let x in tokenarray) {
        try {
            initializeapp_1.admin
                .messaging()
                .sendToDevice(tokenarray[x], message_notification, notification_options)
                .then((response) => {
                console.log(`Notification sent to ${tokenarray[x]}`);
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) { }
    }
};
exports.sendMassNotification = sendMassNotification;
