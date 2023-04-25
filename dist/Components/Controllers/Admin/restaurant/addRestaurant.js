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
exports.addRestaurant = void 0;
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const addRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        let Outlet_Name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.Outlet_Name;
        let Address = (_b = req.body) === null || _b === void 0 ? void 0 : _b.Address;
        let Email = (_c = req.body) === null || _c === void 0 ? void 0 : _c.Email;
        let Phone = (_d = req.body) === null || _d === void 0 ? void 0 : _d.Phone;
        let baseURL = (_e = req.body) === null || _e === void 0 ? void 0 : _e.baseURL;
        let addedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        let addedBy = ((_f = req.session) === null || _f === void 0 ? void 0 : _f.adminName) || "";
        if (!Outlet_Name || !Address || !Email || !Phone || !baseURL) {
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
                Name: `${Outlet_Name}`
            }
        });
        if (userData) {
            res
                .status(400)
                .json({ "error": "Outlet is already registered." });
            return;
        }
        else {
            const restaurantTable = new TblRestaurant_1.TblRestaurant();
            restaurantTable.Name = Outlet_Name;
            restaurantTable.Address = Address;
            restaurantTable.Email = Email;
            restaurantTable.Phone = Phone;
            restaurantTable.baseURL = baseURL;
            restaurantTable.addedDate = addedDate;
            restaurantTable.addedBy = addedBy;
            yield app_data_source_1.default
                .manager
                .save(restaurantTable);
            res
                .status(200)
                .json({ "success": "Outlet registered successfully." });
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
exports.addRestaurant = addRestaurant;
