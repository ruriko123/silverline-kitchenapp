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
exports.findOpenClose = exports.filterwithdistance = exports.filterPopular = void 0;
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
const filterwithdistance = (restaurantData, userlat, userlong) => __awaiter(void 0, void 0, void 0, function* () {
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
                    restaurantData[x].distanceFromUser = distanceresult;
                }
                ;
            }
            ;
            restaurantData.sort((a, b) => {
                return a.distanceFromUser - b.distanceFromUser;
            });
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
exports.filterwithdistance = filterwithdistance;
const filterPopular = (restaurantdataarrayFiltered) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let populararray = [];
        for (let k in restaurantdataarrayFiltered) {
            let restaurantdata = restaurantdataarrayFiltered[k];
            if (restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.isPopular) {
                populararray.push(restaurantdata);
            }
            ;
        }
        ;
        return populararray;
    }
    catch (error) {
        throw new Error('Error while filtering popular restaurants.');
    }
    ;
});
exports.filterPopular = filterPopular;
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
                    restaurantData[x].openState = "OPEN";
                }
                else {
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
