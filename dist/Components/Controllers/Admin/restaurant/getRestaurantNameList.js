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
exports.getRestaurantNameList = void 0;
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const getRestaurantNameList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let restaurantNameList = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .find({
            where: {
                menuUploaded: true
            }
        });
        if (!restaurantNameList || restaurantNameList.length < 1) {
            res
                .status(400)
                .json({ error: "Error while requesting restaurant name list." });
            return;
        }
        else {
            let restaurantListarray = [];
            for (let x in restaurantNameList) {
                let restaurantdata = restaurantNameList[x];
                let restaurantName = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.Name;
                let restaurantid = restaurantdata === null || restaurantdata === void 0 ? void 0 : restaurantdata.id;
                let restaurantObject = {
                    value: `${restaurantid}`,
                    label: restaurantName
                };
                restaurantListarray.push(restaurantObject);
            }
            ;
            res
                .status(200)
                .json(restaurantListarray);
            return;
        }
        ;
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error });
        return;
    }
    ;
});
exports.getRestaurantNameList = getRestaurantNameList;
