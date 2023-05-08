import moment, {tz} from "moment-timezone";
moment().format();


const getCurrentTime = async ()=>{
    const currentTime = await moment.tz(moment(), 'Asia/Kathmandu').format('YYYY-MM-DD HH:mm:ss Z');
    return currentTime;
};


export {getCurrentTime};