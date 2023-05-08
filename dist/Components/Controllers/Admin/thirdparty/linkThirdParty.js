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
exports.linkThirdParty = void 0;
const TblRestaurantThirdPartyLinks_1 = require("../../../../ORM/entities/TblRestaurantThirdPartyLinks");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const TblThirdparty_1 = require("../../../../ORM/entities/TblThirdparty");
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const RestaurantLinkDJANGOAPI_1 = require("../../../../Components/utils/RestaurantLinkDJANGOAPI");
const linkThirdParty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let RestaurantName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.RestaurantName;
        let ThirdPartyName = (_b = req.body) === null || _b === void 0 ? void 0 : _b.ThirdPartyName;
        let restaurantID = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.id;
        if (!RestaurantName || !ThirdPartyName || RestaurantName === "" || ThirdPartyName === "") {
            res
                .status(401)
                .json({ "error": "Missing parameters." });
            return;
        }
        ;
        let ThirdPartyExists = yield app_data_source_1.default
            .getRepository(TblThirdparty_1.TblThirdparty)
            .findOne({
            where: {
                CompanyName: `${ThirdPartyName}`
            }
        });
        if (!ThirdPartyExists) {
            res
                .status(400)
                .json({ "error": "Third party does not exist." });
            return;
        }
        ;
        let restaurantExists = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                Name: `${RestaurantName}`
            }
        });
        if (!restaurantExists) {
            res
                .status(400)
                .json({ "error": "Restaurant does not exist." });
            return;
        }
        ;
        let restaurantLinkData = yield app_data_source_1.default
            .getRepository(TblRestaurantThirdPartyLinks_1.TblRestaurantThirdPartyLinks)
            .findOne({
            where: {
                RestaurantName: `${RestaurantName}`,
                ThirdPartyName: `${ThirdPartyName}`
            }
        });
        if (restaurantLinkData) {
            res
                .status(400)
                .json({ "error": "Third party link to the restaurant already exists." });
            return;
        }
        else {
            let thirdPartyInfo = {
                name: ThirdPartyExists.CompanyName,
                Address: ThirdPartyExists.Address,
                contact_number: ThirdPartyExists.Phone,
                tax_number: ThirdPartyExists.Pan,
                type: "LINK",
                BASEURL: restaurantExists.baseURL,
                email: ThirdPartyExists.Email,
                KEY: "",
            };
            (0, RestaurantLinkDJANGOAPI_1.RestaurantLinkDJANGOAPI)(thirdPartyInfo);
            const restaurantthirdpartyLink = new TblRestaurantThirdPartyLinks_1.TblRestaurantThirdPartyLinks();
            restaurantthirdpartyLink.RestaurantName = RestaurantName;
            restaurantthirdpartyLink.ThirdPartyName = ThirdPartyName;
            restaurantthirdpartyLink.RestaurantID = restaurantID;
            yield app_data_source_1.default
                .manager
                .save(restaurantthirdpartyLink);
            res
                .status(200)
                .json({ "success": "Third party linked with the restaurant successfully." });
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
exports.linkThirdParty = linkThirdParty;
