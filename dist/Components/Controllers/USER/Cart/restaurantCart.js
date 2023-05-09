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
exports.restaurantCart = void 0;
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const token_1 = require("../../../utils/USER/token");
const TblCart_1 = require("../../../../ORM/entities/TblCart");
const TblCartItems_1 = require("../../../../ORM/entities/TblCartItems");
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const restaurantCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        let restaurantID = (_b = req.body) === null || _b === void 0 ? void 0 : _b.restaurantID;
        let IDCart = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.IDCart;
        if (!token || !restaurantID || !IDCart) {
            res
                .status(400)
                .json({ detail: "Missing parameters." });
            return;
        }
        ;
        let tokendata = yield (0, token_1.decodeToken)(token);
        if (!tokendata || (tokendata === null || tokendata === void 0 ? void 0 : tokendata.error)) {
            res
                .status(303)
                .json({ detail: "error while reading token." });
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
        let restaurantExists = yield app_data_source_1.default
            .getRepository(TblRestaurant_1.TblRestaurant)
            .findOne({
            where: {
                id: restaurantID
            }
        });
        if (!restaurantExists) {
            res
                .status(400)
                .json({ detail: "Restaurant does not exist." });
            return;
        }
        ;
        let cartExists = yield app_data_source_1.default
            .getRepository(TblCart_1.TblCart)
            .findOne({
            where: {
                restaurantID: restaurantID,
                idCart: IDCart,
                customerID: userid,
                isActive: true,
                isRemoved: false
            }
        });
        if (!cartExists) {
            res
                .status(400)
                .json({ detail: "Cart does not exist." });
            return;
        }
        ;
        let cartItems = yield app_data_source_1.default
            .getRepository(TblCartItems_1.TblCartItems)
            .createQueryBuilder("t")
            .select([
            "t.idCartitem",
            "t.itemID",
            "t.ItemName",
            "t.costPrice",
            "t.sellingPrice",
            "t.sellingPricewithTax",
            "t.quantity",
            "t.Taxable"
        ])
            .where({ cartID: IDCart, isRemoved: false, isActive: true })
            .getMany();
        if (!cartItems) {
            res
                .status(400)
                .json({ detail: "Error while fetching cart items." });
            return;
        }
        let receiptjson = {
            total: "",
            subtotal: "",
            deliverycharge: ""
        };
        let idrestaurant = restaurantExists.id;
        let restaurantdetails = {
            Name: (restaurantExists === null || restaurantExists === void 0 ? void 0 : restaurantExists.Name) || "",
            description: (restaurantExists === null || restaurantExists === void 0 ? void 0 : restaurantExists.slogan) || (restaurantExists === null || restaurantExists === void 0 ? void 0 : restaurantExists.details) || "",
            location: (restaurantExists === null || restaurantExists === void 0 ? void 0 : restaurantExists.Address) || "",
            cartID: cartExists.idCart,
            idrestaurant: idrestaurant
        };
        res
            .status(200)
            .json({ items: cartItems, receipt: receiptjson, restaurant: restaurantdetails });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.restaurantCart = restaurantCart;
