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

const getdistancefromuser = async(restaurantData : keyable, userlat : string, userlong : string) => {
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
                    restaurantData[x].distanceFromUser = Math.round(distanceresult / 1000 * 10) / 10;
                };
            };
            // restaurantData.sort((a : any, b : any) => {     return a.distanceFromUser -
            // b.distanceFromUser; });
            return restaurantData;
        } else {
            throw new Error('Error while parsing user coordinates.');
        };
    } catch (error) {
        throw new Error('Error while calculating distance.');
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
                    restaurantdata.openingTime = await moment(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = await moment(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    restaurantData[x].openState = "OPEN";
                } else {
                    restaurantdata.openingTime = await moment(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = await moment(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    restaurantData[x].openState = "CLOSED";
                };
            };
        };
        return restaurantData;
    } catch (error) {
        throw new Error('Error while checking restaurant open/close status.');
    }

};

const sortMenu = async(menuData : any) => {
    if (!menuData || menuData.length === 0) {
        return [];
    } else {
        let menu:any = menuData;
        try {
            let menusortedobject : any = {};
            for (let x in menu) {
                let menuobject = menu[x];
                let menucategory = menuobject
                    ?.Category;
                if (menusortedobject[menucategory] || menusortedobject[menucategory]
                    ?.length > 0) {
                    menusortedobject[menucategory] = [
                        ...menusortedobject[menucategory],
                        menuobject
                    ]
                } else {
                    menusortedobject[menucategory] = [menuobject];
                };
            };
            let returnjsonarray : any = [];
            Object
                .keys(menusortedobject)
                .forEach(function (key) {
                    let keyitem = menusortedobject[key];
                    let returnjsonobject = {
                        title: `${key}`,
                        items: keyitem
                    };
                    returnjsonarray.push(returnjsonobject);
                });
            return returnjsonarray
        } catch (error) {
            throw new Error('Error occured while sorting menu.');
        }
    }
}

export {getdistancefromuser, findOpenClose, sortMenu}