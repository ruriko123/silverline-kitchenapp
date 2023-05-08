import moment from "moment-timezone";
moment().format();

const getTimeDiff = async(firstDate : Date, secondDate : Date) => {
    try {
        let a = moment(firstDate, "YYYY-MM-DD HH:mm:ss Z");
        let b = moment(secondDate, "YYYY-MM-DD HH:mm:ss Z");
        let diff = a.diff(b, 'minutes');
        return Math.abs(diff);
    } catch (error : any) {
        throw new Error(`${error}`)
    };
};

const getTimeAfterTimeout = async(firstdate : Date) => {
    try {
        let result = await moment(firstdate, "YYYY-MM-DD HH:mm:ss Z")
            .add(process.env.REGISTRATION_otpTimeout, 'minutes')
            .format('hh:mm:ss A');
        return result;
    } catch (error) {
        return `${process.env.REGISTRATION_otpTimeout} minutes`;
    };
};

export {getTimeDiff, getTimeAfterTimeout};