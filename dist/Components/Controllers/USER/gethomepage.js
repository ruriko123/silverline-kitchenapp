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
exports.gethomepage = void 0;
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const token_1 = require("../../utils/USER/token");
const Tbluser_1 = require("../../../ORM/entities/Tbluser");
const TblRestaurant_1 = require("../../../ORM/entities/TblRestaurant");
const gethomepage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        let tokendata = yield (0, token_1.decodeToken)(token);
        if (!tokendata || (tokendata === null || tokendata === void 0 ? void 0 : tokendata.error)) {
            res
                .status(400)
                .json({ detail: "error while reading token." });
            return;
        }
        ;
        let userid = tokendata === null || tokendata === void 0 ? void 0 : tokendata.id;
        let userdisplayname = tokendata === null || tokendata === void 0 ? void 0 : tokendata.displayname;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                id: userid,
                displayname: `${userdisplayname}`
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ detail: "User not found." });
            return;
        }
        ;
        let userPreferredLocation = userData === null || userData === void 0 ? void 0 : userData.preferredlocation;
        let userLat = userData === null || userData === void 0 ? void 0 : userData.lat;
        let userlong = userData === null || userData === void 0 ? void 0 : userData.long;
        console.log(userPreferredLocation);
        let restaurantData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .createQueryBuilder("t")
            .select(["t.Name", "t.Address", "t.long", "t.lat", "t.coverimage", "t.openingTime", "t.closingTime"])
            .where({ isActive: true,
            operatingLocation: `${userPreferredLocation}` })
            .getMany();
        console.log(restaurantData);
        if (!restaurantData || restaurantData.length < 1) {
            res
                .status(400)
                .json({ "error": "No data available." });
            return;
        }
        ;
        res
            .status(200)
            .json(restaurantData);
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.gethomepage = gethomepage;
