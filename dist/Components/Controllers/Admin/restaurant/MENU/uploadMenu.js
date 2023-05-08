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
exports.uploadMenu = void 0;
const TblRestaurant_1 = require("@model/TblRestaurant");
const TblMenu_1 = require("@model/TblMenu");
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const uploadMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let menudata = (_a = req.body) === null || _a === void 0 ? void 0 : _a.menudata;
        let restaurantID = (_b = req.body) === null || _b === void 0 ? void 0 : _b.restaurantID;
        let restaurantName = (_c = req.body) === null || _c === void 0 ? void 0 : _c.restaurantName;
        if (!restaurantName || !restaurantID || !menudata) {
            res
                .status(400)
                .json({ "error": "Missing Parameters." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                Name: `${restaurantName}`,
                id: restaurantID
            }
        });
        if (!(userData)) {
            res
                .status(400)
                .json({ "error": "Restaurant does not exist." });
            return;
        }
        else {
            menudata.map((e, index) => __awaiter(void 0, void 0, void 0, function* () {
                if (index && index > 0) {
                    try {
                        let itemname = e[1] || "";
                        let checkItemExists = yield app_data_source_1.default
                            .getRepository(TblMenu_1.TblMenu)
                            .findOne({
                            where: {
                                ItemName: `${itemname}`,
                                restaurantID: restaurantID
                            }
                        });
                        if (!checkItemExists) {
                            const menuTable = new TblMenu_1.TblMenu();
                            menuTable.Category = e[0] || "";
                            menuTable.ItemName = e[1] || "";
                            menuTable.costPrice = e[2] || "";
                            menuTable.sellingPrice = e[3] || "";
                            menuTable.sellingPricewithTax = e[4] || "";
                            menuTable.description = e[5] || "";
                            menuTable.Taxable = e[6] || true;
                            menuTable.restaurantID = restaurantID;
                            yield app_data_source_1.default
                                .manager
                                .save(menuTable);
                        }
                        else {
                            let Category = e[0] || "";
                            let ItemName = e[1] || "";
                            let costPrice = e[2] || "";
                            let sellingPrice = e[3] || "";
                            let sellingPricewithTax = e[4] || "";
                            let description = e[5] || "";
                            let Taxable = e[6] || true;
                            yield app_data_source_1.default
                                .createQueryBuilder()
                                .update(TblMenu_1.TblMenu)
                                .set({
                                Taxable: Taxable,
                                description: description,
                                sellingPricewithTax: sellingPricewithTax,
                                sellingPrice: sellingPrice,
                                costPrice: costPrice,
                                isActive: true,
                                Category: Category,
                                ItemName: ItemName
                            })
                                .where({ idMenu: checkItemExists.idMenu })
                                .execute();
                        }
                    }
                    catch (error) { }
                }
                ;
            }));
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblRestaurant_1.TblRestaurant)
                .set({
                menuUploaded: true,
            })
                .where({ id: restaurantID })
                .execute();
            res
                .status(200)
                .json({ "success": "Menu uploaded successfully." });
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
exports.uploadMenu = uploadMenu;
