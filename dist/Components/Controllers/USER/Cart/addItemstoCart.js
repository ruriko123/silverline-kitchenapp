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
exports.addItemstoCart = void 0;
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const token_1 = require("../../../utils/USER/token");
const TblCart_1 = require("../../../../ORM/entities/TblCart");
const TblCartItems_1 = require("../../../../ORM/entities/TblCartItems");
const TblMenu_1 = require("../../../../ORM/entities/TblMenu");
function isItNumber(str) {
    return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
;
const addItemstoCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        let restaurantID = (_b = req.body) === null || _b === void 0 ? void 0 : _b.restaurantID;
        let cartItems = req === null || req === void 0 ? void 0 : req.body;
        if (!token || !restaurantID) {
            res
                .status(400)
                .json({ detail: "Missing parameters." });
            return;
        }
        ;
        let tokendata = yield (0, token_1.decodeToken)(token);
        if (!tokendata || (tokendata === null || tokendata === void 0 ? void 0 : tokendata.error)) {
            res
                .status(400)
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
        let cart = new TblCart_1.TblCart();
        cart.customerID = userid;
        cart.restaurantID = restaurantID;
        let savedCart = yield app_data_source_1.default
            .manager
            .save(cart);
        let cartID = savedCart === null || savedCart === void 0 ? void 0 : savedCart.idCart;
        let insertCount = 0;
        cartItems["cartID"] = cartID;
        for (let i = 0; i < cartItems.items.length; i++) {
            let cartItem = cartItems.items[i];
            let itemID = cartItem === null || cartItem === void 0 ? void 0 : cartItem.itemID;
            let ItemName = cartItem === null || cartItem === void 0 ? void 0 : cartItem.ItemName;
            let costPrice = cartItem === null || cartItem === void 0 ? void 0 : cartItem.costPrice;
            let sellingPrice = cartItem === null || cartItem === void 0 ? void 0 : cartItem.sellingPrice;
            let sellingPricewithTax = cartItem === null || cartItem === void 0 ? void 0 : cartItem.sellingPricewithTax;
            let Taxable = cartItem === null || cartItem === void 0 ? void 0 : cartItem.Taxable;
            let quantity = cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity;
            if (isItNumber(quantity) && isItNumber(sellingPricewithTax) && isItNumber(sellingPrice) && isItNumber(costPrice) && Taxable && sellingPricewithTax && itemID && ItemName && costPrice && sellingPrice) {
                costPrice = parseFloat(costPrice);
                sellingPrice = parseFloat(sellingPrice);
                sellingPricewithTax = parseFloat(sellingPricewithTax);
                quantity = parseFloat(quantity);
                let menudata = yield app_data_source_1.default
                    .getRepository(TblMenu_1.TblMenu)
                    .findOne({
                    where: {
                        idMenu: itemID,
                        restaurantID: restaurantID
                    }
                });
                if (menudata) {
                    let cartitementity = new TblCartItems_1.TblCartItems();
                    cartitementity.cartID = cartID;
                    cartitementity.itemID = itemID;
                    cartitementity.ItemName = ItemName;
                    cartitementity.costPrice = costPrice;
                    cartitementity.sellingPrice = sellingPrice;
                    cartitementity.sellingPricewithTax = sellingPricewithTax;
                    cartitementity.Taxable = Taxable;
                    cartitementity.quantity = quantity;
                    yield app_data_source_1.default
                        .manager
                        .save(cartitementity)
                        .then((e) => __awaiter(void 0, void 0, void 0, function* () {
                        cartItems.items[i]["idCartitem"] = e.idCartitem;
                    }));
                    insertCount++;
                }
                ;
            }
        }
        ;
        if (insertCount === 0) {
            yield app_data_source_1.default
                .createQueryBuilder()
                .delete()
                .from(TblCart_1.TblCart)
                .where({ idCart: cartID })
                .execute();
            res
                .status(400)
                .json({ "detail": "Couldn't save items to cart. Make sure that the data correct." });
            return;
        }
        ;
        res
            .status(200)
            .json(cartItems);
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
exports.addItemstoCart = addItemstoCart;
