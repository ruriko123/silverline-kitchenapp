import moment from "moment-timezone";
moment().format();

const getTimeDiff = async(firstDate : Date, secondDate : Date) => {
    try {
        let a =await moment.tz(moment(firstDate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu')
        let b = await moment.tz(moment(secondDate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu')
        let diff = a.diff(b, 'minutes');
        return Math.abs(diff);
    } catch (error : any) {
        throw new Error(`${error}`);
    };
};

const getTimeAfterTimeout = async(firstdate : Date) => {
    try {
        let result = await moment.tz(moment(firstdate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu')
            .add(process.env.REGISTRATION_otpTimeout, 'm')
            .format('hh:mm:ss A');
        return result;
    } catch (error) {
        return `${process.env.REGISTRATION_otpTimeout} minutes`;
    };
};


const resendgetTimeAfterTimeout = async(firstdate : Date) => {
    try {
        let addtime = parseInt(`${process.env.OTP_RESEND_TIMEOUT}`);
        let result = await moment.tz(moment(firstdate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu').add(addtime, 'm').format("hh:mm:ss A");
        return result;
    } catch (error) {
        return `${process.env.OTP_RESEND_TIMEOUT} minutes`;
    };
};

export {getTimeDiff, getTimeAfterTimeout,resendgetTimeAfterTimeout};