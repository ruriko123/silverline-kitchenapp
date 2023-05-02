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
exports.getRestaurant = void 0;
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const token_1 = require("../../utils/USER/token");
const Tbluser_1 = require("../../../ORM/entities/Tbluser");
const TblRestaurant_1 = require("../../../ORM/entities/TblRestaurant");
const restaurantdatafilters_1 = require("../../utils/USER/restaurantdatafilters");
const TblMenu_1 = require("../../../ORM/entities/TblMenu");
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        let restaurantID = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id;
        if (!restaurantID) {
            res
                .status(400)
                .json({ detail: "Restaurant ID not supplied." });
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
        let userLat = (userData === null || userData === void 0 ? void 0 : userData.lat) || "27.7172";
        let userlong = (userData === null || userData === void 0 ? void 0 : userData.long) || "85.3240";
        let restaurantData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .createQueryBuilder("t")
            .select([
            "t.Name",
            "t.Address",
            "t.long",
            "t.lat",
            "t.coverimage",
            "t.openingTime",
            "t.closingTime",
            "t.isPopular",
            "t.slogan",
            "t.details",
            "t.Address",
            "t.logo"
        ])
            .where({ isActive: true, id: restaurantID })
            .getMany();
        if (!restaurantData || restaurantData.length < 1) {
            res
                .status(400)
                .json({ "error": "No data available." });
            return;
        }
        ;
        let menudata = (yield app_data_source_1.default
            .getRepository(TblMenu_1.TblMenu)
            .createQueryBuilder("t")
            .select([
            "t.IDMenu",
            "t.Category",
            "t.ItemName",
            "t.costPrice",
            "t.sellingPrice",
            "t.sellingPricewithTax",
            "t.description",
            "t.restaurantID",
            "t.Taxable",
            "t.isActive",
        ])
            .where({ isActive: true, restaurantID: restaurantID })
            .getMany()) || [];
        try {
            let sortedMenu = (yield (0, restaurantdatafilters_1.sortMenu)(menudata)) || [];
            let restaurantDataFilteredWithDistance = yield (0, restaurantdatafilters_1.getdistancefromuser)(restaurantData, userLat, userlong);
            restaurantDataFilteredWithDistance = yield (0, restaurantdatafilters_1.findOpenClose)(restaurantDataFilteredWithDistance);
            let responsejson = { restaurantDetails: restaurantDataFilteredWithDistance[0] || {}, menu: sortedMenu || [] };
            res
                .status(200)
                .json(responsejson);
            return;
        }
        catch (error) {
            res
                .status(400)
                .json({ "error": error });
            return;
        }
        ;
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.getRestaurant = getRestaurant;
