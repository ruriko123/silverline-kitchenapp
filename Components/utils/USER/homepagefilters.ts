import haversine from 'haversine-distance';
import moment, {tz} from "moment-timezone";
moment().format();

interface keyable {
    [key : string] : any
}

const checkFloatParsable = async(lat : string, long : string) => {
    try {
        let testlat = parseFloat(lat);
        let testlong = parseFloat(long);
        return true;
    } catch (error) {
        return false;
    };
};

const checkopeningclosingtimevalid = async(openingtime : string, closingtime : string) => {
    try {
        if (moment(openingtime, "HH:mm:ss", true).isValid() && moment(closingtime, "HH:mm:ss", true).isValid()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    };
};

const filterwithdistance = async(restaurantData : keyable, userlat : string, userlong : string) => {
    try {
        if (await checkFloatParsable(userlat, userlong)) {
            const userCoords = {
                lat: parseFloat(userlat),
                lon: parseFloat(userlong)
            };
            for (let x in restaurantData) {
                let restaurantdata = restaurantData[x];
                let restaurantlong = restaurantdata
                    ?.long;
                let restaurantlat = restaurantdata
                    ?.lat;
                if (await checkFloatParsable(restaurantlat, restaurantlong)) {
                    let restaurantCoords = {
                        lat: parseFloat(restaurantlat),
                        lon: parseFloat(restaurantlong)
                    };
                    let distanceresult = await haversine(userCoords, restaurantCoords);
                    restaurantData[x].distanceFromUser = distanceresult;
                };
            };
            restaurantData.sort((a : any, b : any) => {
                return a.distanceFromUser - b.distanceFromUser;
            });
            return restaurantData;
        } else {
            throw new Error('Error while parsing user coordinates.');
        };
    } catch (error) {
        throw new Error('Error while calculating distance.');
    };

};

const filterPopular = async(restaurantdataarrayFiltered : keyable) => {
    try {
        let populararray:Array<any> = [];
        for (let k in restaurantdataarrayFiltered){
            let restaurantdata  =restaurantdataarrayFiltered[k];
            if(restaurantdata?.isPopular){
                populararray.push(restaurantdata);
            };
        };
        return populararray;
    } catch (error) {
        throw new Error('Error while filtering popular restaurants.');
    };
};

const findOpenClose = async(restaurantData : keyable) => {
    try {
        const currentTime = moment.tz(moment(), 'Asia/Kathmandu').format('HH:mm:ss');
        for (let x in restaurantData) {
            let restaurantdata = restaurantData[x];
            let restaurantopeningTime = restaurantdata
                ?.openingTime;
            let restaurantclosingTime = restaurantdata
                ?.closingTime;
            restaurantopeningTime = `${restaurantopeningTime}:00`;
            restaurantclosingTime = `${restaurantclosingTime}:00`;
            if (await checkopeningclosingtimevalid(restaurantopeningTime, restaurantclosingTime)) {
                if (currentTime >= restaurantopeningTime && currentTime <= restaurantclosingTime) {
                    restaurantData[x].openState = "OPEN";
                } else {
                    restaurantData[x].openState = "CLOSED";
                };
            };
        };
        return restaurantData;
    } catch (error) {
        throw new Error('Error while checking restaurant open/close status.');
    }

};

export {filterPopular, filterwithdistance, findOpenClose}