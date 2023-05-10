import {admin} from './initializeapp';

const sendMassNotification = (tokens : Array < any >, title : string, body : string) => {
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

    let tokenarray : Array < string >= [];
    for (let k in tokens) {
        let firebasetoken = tokens[k]
            ?.firebaseToken;
        if (firebasetoken) {
            tokenarray.push(firebasetoken)
        };
    };

    for (let x in tokenarray) {
        try {
            admin
                .messaging()
                .sendToDevice(tokenarray[x], message_notification, notification_options)
                .then((response : any) => {
                    console.log(`Notification sent to ${tokenarray[x]}`)
                })
                .catch((error : any) => {
                    console.log(error);
                });
        } catch (error) {}
    }

};

export {sendMassNotification};