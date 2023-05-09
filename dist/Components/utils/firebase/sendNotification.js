"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendnotification = void 0;
const initializeapp_1 = require("./initializeapp");
const sendnotification = (token, title, body) => {
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
    initializeapp_1.admin
        .messaging()
        .sendToDevice(token, message_notification, notification_options)
        .then((response) => {
        console.log(`Notification sent to ${token}`);
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.sendnotification = sendnotification;
