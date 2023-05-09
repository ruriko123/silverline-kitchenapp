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
exports.getMenu = void 0;
const TblRestaurant_1 = require("../../../../../ORM/entities/TblRestaurant");
const TblMenu_1 = require("../../../../../ORM/entities/TblMenu");
const app_data_source_1 = __importDefault(require("../../../../../app-data-source"));
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let restaurantID = (_a = req.body) === null || _a === void 0 ? void 0 : _a.restaurantID;
        if (!restaurantID) {
            res
                .status(400)
                .json({ detail: "Missing Parameters." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                id: restaurantID
            }
        });
        if (!(userData)) {
            res
                .status(400)
                .json({ detail: "Restaurant does not exist." });
            return;
        }
        else {
            let menudata = (yield app_data_source_1.default
                .getRepository(TblMenu_1.TblMenu)
                .createQueryBuilder("")
                .select([
                "IDMenu",
                "Category",
                "ItemName",
                "costPrice",
                "sellingPrice",
                "sellingPricewithTax",
                "description",
                "restaurantID",
                "Taxable",
                "isActive"
            ])
                .where({ restaurantID: restaurantID })
                .getRawMany()) || [];
            res
                .status(200)
                .json(menudata);
            return;
        }
        ;
    }
    catch (error) {
        res
            .status(500)
            .json({ detail: error });
        return;
    }
    ;
});
exports.getMenu = getMenu;
