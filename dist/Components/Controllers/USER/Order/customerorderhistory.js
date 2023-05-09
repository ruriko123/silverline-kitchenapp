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
exports.customerorderhistory = void 0;
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const token_1 = require("../../../utils/USER/token");
const TblCart_1 = require("../../../../ORM/entities/TblCart");
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const TblCartItems_1 = require("../../../../ORM/entities/TblCartItems");
const customerorderhistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res
                .status(303)
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
        let cart = yield app_data_source_1.default
            .getRepository(TblCart_1.TblCart)
            .createQueryBuilder("t")
            .select([
            "t.idCart",
            "t.restaurantID",
            "t.taxable",
            "t.taxAmount",
            "t.nontaxable",
            "t.subTotal",
            "t.Total",
            "t.deliveryCharge",
            "t.checkoutAt"
        ])
            .where({ customerID: userid, isRemoved: false, isActive: false })
            .orderBy('t.idCart', 'DESC')
            .getMany();
        if (!cart) {
            res
                .status(400)
                .json({ detail: "Order history is empty." });
            return;
        }
        else {
            let cartdata = cart;
            for (let i in cart) {
                let restaurantid = (_b = cart[i]) === null || _b === void 0 ? void 0 : _b.restaurantID;
                let restaurant = yield app_data_source_1.default
                    .getRepository(TblRestaurant_1.TblRestaurant)
                    .createQueryBuilder("x")
                    .select(["x.Name", "x.Address", "x.logo", "x.details"])
                    .where({ id: restaurantid, isActive: true })
                    .getOne();
                if (restaurant) {
                    cartdata[i]["restaurantDetails"] = restaurant;
                }
                else {
                    delete cartdata[i];
                }
                ;
                let cartid = (_c = cart[i]) === null || _c === void 0 ? void 0 : _c.idCart;
                let cartitems = yield app_data_source_1.default
                    .getRepository(TblCartItems_1.TblCartItems)
                    .createQueryBuilder("x")
                    .select([
                    "x.idCartitem",
                    "x.ItemName",
                    "x.sellingPrice",
                    "x.quantity",
                ])
                    .where({ cartID: cartid, isRemoved: false, isActive: false })
                    .getMany();
                if (cartitems) {
                    cartdata[i]["cartitems"] = cartitems;
                }
                else {
                    cartdata[i]["cartitems"] = [];
                }
                ;
            }
            ;
            res
                .status(200)
                .json(cartdata);
            return;
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.customerorderhistory = customerorderhistory;
