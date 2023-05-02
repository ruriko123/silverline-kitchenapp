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
exports.menuItemInActive = void 0;
const TblMenu_1 = require("../../../../../ORM/entities/TblMenu");
const app_data_source_1 = __importDefault(require("../../../../../app-data-source"));
const menuItemInActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let itemID = (_a = req.body) === null || _a === void 0 ? void 0 : _a.itemID;
        if (!itemID) {
            res
                .status(400)
                .json({ "error": "Missing Parameters." });
            return;
        }
        ;
        let menuExists = yield app_data_source_1.default
            .getRepository(TblMenu_1.TblMenu)
            .findOne({
            where: {
                idMenu: itemID
            }
        });
        if (!(menuExists)) {
            res
                .status(400)
                .json({ "error": "Item does not exist." });
            return;
        }
        else {
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblMenu_1.TblMenu)
                .set({ isActive: false })
                .where({ idMenu: itemID })
                .execute();
            res
                .status(200)
                .json({ "success": "Item made inactive." });
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
exports.menuItemInActive = menuItemInActive;
