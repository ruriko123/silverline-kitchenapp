"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOpenOrClosed = exports.sortMenu = exports.findOpenClose = exports.getdistancefromuser = void 0;
const haversine_distance_1 = __importDefault(require("haversine-distance"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
(0, moment_timezone_1.default)().format();
const checkFloatParsable = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let testlat = parseFloat(lat);
        let testlong = parseFloat(long);
        return true;
    }
    catch (error) {
        return false;
    }
    ;
});
const checkopeningclosingtimevalid = (openingtime, closingtime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, moment_timezone_1.default)(openingtime, "HH:mm:ss", true).isValid() && (0, moment_timezone_1.default)(closingtime, "HH:mm:ss", true).isValid()) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    ;
});
const checkOpenOrClosed = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentTime = moment_timezone_1.default.tz((0, moment_timezone_1.default)(), 'Asia/Kathmandu').format('HH:mm:ss');
        for (let x in restaurantData) {
            let restaurantdata = restaurantData[x];
            let restaurantopeningTime = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.openingTime;
            let restaurantclosingTime = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.closingTime;
            restaurantopeningTime = `${restaurantopeningTime}:00`;
            restaurantclosingTime = `${restaurantclosingTime}:00`;
            if (yield checkopeningclosingtimevalid(restaurantopeningTime, restaurantclosingTime)) {
                if (currentTime >= restaurantopeningTime && currentTime <= restaurantclosingTime) {
                    restaurantdata.openingTime = yield (0, moment_timezone_1.default)(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = yield (0, moment_timezone_1.default)(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    return true;
                }
                else {
                    restaurantdata.openingTime = yield (0, moment_timezone_1.default)(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = yield (0, moment_timezone_1.default)(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    return false;
                }
                ;
            }
            ;
        }
        ;
        return restaurantData;
    }
    catch (error) {
        throw new Error('Error while checking restaurant open/close status.');
    }
});
exports.checkOpenOrClosed = checkOpenOrClosed;
const getdistancefromuser = (restaurantData, userlat, userlong) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield checkFloatParsable(userlat, userlong)) {
            const userCoords = {
                lat: parseFloat(userlat),
                lon: parseFloat(userlong)
            };
            for (let x in restaurantData) {
                let restaurantdata = restaurantData[x];
                let restaurantlong = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.long;
                let restaurantlat = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.lat;
                if (yield checkFloatParsable(restaurantlat, restaurantlong)) {
                    let restaurantCoords = {
                        lat: parseFloat(restaurantlat),
                        lon: parseFloat(restaurantlong)
                    };
                    let distanceresult = yield (0, haversine_distance_1.default)(userCoords, restaurantCoords);
                    restaurantData[x].distanceFromUser = Math.round(distanceresult / 1000 * 10) / 10;
                }
                ;
            }
            ;
            // restaurantData.sort((a : any, b : any) => {     return a.distanceFromUser -
            // b.distanceFromUser; });
            return restaurantData;
        }
        else {
            throw new Error('Error while parsing user coordinates.');
        }
        ;
    }
    catch (error) {
        throw new Error('Error while calculating distance.');
    }
    ;
});
exports.getdistancefromuser = getdistancefromuser;
const findOpenClose = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentTime = moment_timezone_1.default.tz((0, moment_timezone_1.default)(), 'Asia/Kathmandu').format('HH:mm:ss');
        for (let x in restaurantData) {
            let restaurantdata = restaurantData[x];
            let restaurantopeningTime = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.openingTime;
            let restaurantclosingTime = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.closingTime;
            restaurantopeningTime = `${restaurantopeningTime}:00`;
            restaurantclosingTime = `${restaurantclosingTime}:00`;
            if (yield checkopeningclosingtimevalid(restaurantopeningTime, restaurantclosingTime)) {
                if (currentTime >= restaurantopeningTime && currentTime <= restaurantclosingTime) {
                    restaurantdata.openingTime = yield (0, moment_timezone_1.default)(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = yield (0, moment_timezone_1.default)(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    restaurantData[x].openState = "OPEN";
                }
                else {
                    restaurantdata.openingTime = yield (0, moment_timezone_1.default)(restaurantopeningTime, "hh:mm:ss").format("hh:mm a");
                    restaurantdata.closingTime = yield (0, moment_timezone_1.default)(restaurantclosingTime, "hh:mm:ss").format("hh:mm a");
                    restaurantData[x].openState = "CLOSED";
                }
                ;
            }
            ;
        }
        ;
        return restaurantData;
    }
    catch (error) {
        throw new Error('Error while checking restaurant open/close status.');
    }
});
exports.findOpenClose = findOpenClose;
const sortMenu = (menuData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!menuData || menuData.length === 0) {
        return [];
    }
    else {
        let menu = menuData;
        try {
            let menusortedobject = {};
            for (let x in menu) {
                let menuobject = menu[x];
                let menucategory = menuobject === null || menuobject === void 0 ? void 0 : menuobject.Category;
                if (menusortedobject[menucategory] || ((_a = menusortedobject[menucategory]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    menusortedobject[menucategory] = [
                        ...menusortedobject[menucategory],
                        menuobject
                    ];
                }
                else {
                    menusortedobject[menucategory] = [menuobject];
                }
                ;
            }
            ;
            let returnjsonarray = [];
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
            return returnjsonarray;
        }
        catch (error) {
            throw new Error('Error occured while sorting menu.');
        }
    }
});
exports.sortMenu = sortMenu;
