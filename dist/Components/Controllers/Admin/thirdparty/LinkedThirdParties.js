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
exports.LinkedThirdParties = void 0;
const TblRestaurantThirdPartyLinks_1 = require("@model/TblRestaurantThirdPartyLinks");
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const TblThirdparty_1 = require("@model/TblThirdparty");
const LinkedThirdParties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        let restaurantName = (_b = req.body) === null || _b === void 0 ? void 0 : _b.restaurantName;
        if (!id || !restaurantName) {
            res
                .status(500)
                .json({ "error": "Missing parameters." });
            return;
        }
        ;
        let allThirdPartyNames = yield app_data_source_1.default
            .getRepository(TblThirdparty_1.TblThirdparty)
            .createQueryBuilder("t")
            .select(["t.CompanyName"])
            .getMany();
        let allthirdPartiesarray = [];
        for (let x in allThirdPartyNames) {
            let companyname = allThirdPartyNames[x].CompanyName;
            let tempobject = {
                value: companyname,
                label: companyname
            };
            allthirdPartiesarray.push(tempobject);
        }
        ;
        let linkedParties = yield app_data_source_1.default
            .getRepository(TblRestaurantThirdPartyLinks_1.TblRestaurantThirdPartyLinks)
            .createQueryBuilder("t")
            .select(["t.ThirdPartyName"])
            .where({ RestaurantID: id, RestaurantName: restaurantName })
            .getMany();
        let linkedpartiesarray = [];
        if (linkedParties && linkedParties.length > 0) {
            for (let k in linkedParties) {
                let ThirdPartyName = linkedParties[k].ThirdPartyName;
                let ThirdPartyNametempobject = {
                    value: ThirdPartyName,
                    label: ThirdPartyName
                };
                linkedpartiesarray.push(ThirdPartyNametempobject);
            }
            ;
        }
        ;
        let jsonData = {
            allThirdPartyNames: allthirdPartiesarray,
            linkedParties: linkedpartiesarray
        };
        res
            .status(200)
            .json(jsonData);
        return;
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.LinkedThirdParties = LinkedThirdParties;
