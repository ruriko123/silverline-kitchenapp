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
exports.updateRestaurantinfo = void 0;
const TblRestaurant_1 = require("@model/TblRestaurant");
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const typeorm_1 = require("typeorm");
const updateRestaurantinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let restaurantData = req.body;
        let id = parseInt((_a = req.body) === null || _a === void 0 ? void 0 : _a.id);
        let Outlet_Name = (_b = req.body) === null || _b === void 0 ? void 0 : _b.Name;
        let modifiedby = ((_c = req.session) === null || _c === void 0 ? void 0 : _c.adminName) || "";
        if (!Outlet_Name || !id) {
            res
                .status(400)
                .json({ "error": "Outlet Name or ID not supplied." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                Name: `${Outlet_Name}`,
                id: (0, typeorm_1.Not)(id)
            }
        });
        if (userData) {
            res
                .status(400)
                .json({ "error": "Restaurant Name already exists. Try another name." });
            return;
        }
        else {
            restaurantData.lastModifiedBy = modifiedby;
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblRestaurant_1.TblRestaurant)
                .set(restaurantData)
                .where("id = :id", { id: id })
                .execute();
            res
                .status(200)
                .json({ "success": "Restautant Updated." });
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
exports.updateRestaurantinfo = updateRestaurantinfo;
