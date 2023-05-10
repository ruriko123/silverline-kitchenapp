import {admin} from './initializeapp';

const sendnotification = (token : any, title : string, body : string) => {
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
    admin
        .messaging()
        .sendToDevice(token, message_notification, notification_options)
        .then((response : any) => {
            console.log(`Notification sent to ${token}`)
        })
        .catch((error:any) => {
            console.log(error);
        });
};





export {sendnotification};