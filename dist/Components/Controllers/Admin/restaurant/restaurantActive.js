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
exports.restaurantActive = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const restaurantActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res
                .status(401)
                .json({ "error": "Restaurant ID not supplied." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                id: id
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ error: "Restaurant with this ID does not exist." });
            return;
        }
        else {
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblRestaurant_1.TblRestaurant)
                .set({ isActive: true })
                .where("id = :id", { id: id })
                .execute();
            res
                .status(200)
                .json({ "success": "Restaurant made active." });
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
exports.restaurantActive = restaurantActive;
