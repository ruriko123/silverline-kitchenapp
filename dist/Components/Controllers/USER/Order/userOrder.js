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
exports.userOrder = void 0;
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const token_1 = require("../../../utils/USER/token");
const saveClientOrder_1 = require("../../../../Components/Middlewares/USER/saveClientOrder");
const TblRestaurant_1 = require("../../../../ORM/entities/TblRestaurant");
const TblMenu_1 = require("../../../../ORM/entities/TblMenu");
const TblCart_1 = require("../../../../ORM/entities/TblCart");
const TblCartItems_1 = require("../../../../ORM/entities/TblCartItems");
const userOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
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
        let deliverycustomer = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.deliverycustomer;
        if (!(deliverycustomer === null || deliverycustomer === void 0 ? void 0 : deliverycustomer.deliverycustomer_name)) {
            res
                .status(400)
                .json({ detail: "Delivery customer name missing." });
            return;
        }
        if (!(deliverycustomer === null || deliverycustomer === void 0 ? void 0 : deliverycustomer.deliverycustomer_phone)) {
            res
                .status(400)
                .json({ detail: "Delivery customer phone missing." });
            return;
        }
        if (!(deliverycustomer === null || deliverycustomer === void 0 ? void 0 : deliverycustomer.deliverycustomerAddress)) {
            res
                .status(400)
                .json({ detail: "Delivery customer address missing." });
            return;
        }
        let cartID = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.outlet_orderid;
        let restaurantID = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.outletID;
        if (!cartID || !restaurantID) {
            res
                .status(400)
                .json({ detail: "outletID or outlet_orderid missing." });
            return;
        }
        let cartExists = yield app_data_source_1.default
            .getRepository(TblCart_1.TblCart)
            .findOne({
            where: {
                restaurantID: restaurantID,
                idCart: cartID,
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
                .json({ detail: "Incorrect restaurant id supplied." });
            return;
        }
        let order = req === null || req === void 0 ? void 0 : req.body;
        order["outletName"] = restaurantExists.Name || `${restaurantID}`;
        order["customerName"] = (userData === null || userData === void 0 ? void 0 : userData.displayname) || "";
        order["customerPhone"] = (userData === null || userData === void 0 ? void 0 : userData.phone) || "";
        order["Address"] = (userData === null || userData === void 0 ? void 0 : userData.locationName) || "";
        let returnobject = order;
        let cartitemarray = [];
        for (let i in order["OrderItemDetailsList"]) {
            console.log("inside", i);
            let orderitem = order["OrderItemDetailsList"][i];
            let itemid = orderitem === null || orderitem === void 0 ? void 0 : orderitem.itemID;
            let quantityint = parseInt((orderitem === null || orderitem === void 0 ? void 0 : orderitem.quantity) || "0");
            let quantity = parseFloat((orderitem === null || orderitem === void 0 ? void 0 : orderitem.quantity) || "0.00");
            console.log(orderitem.quantity, quantity);
            let menuExists = yield app_data_source_1.default
                .getRepository(TblMenu_1.TblMenu)
                .findOne({
                where: {
                    idMenu: itemid,
                    restaurantID: restaurantID
                }
            });
            console.log(menuExists);
            if (!quantity || quantity === 0) {
                yield app_data_source_1.default
                    .createQueryBuilder()
                    .update(TblCartItems_1.TblCartItems)
                    .set({ isActive: false, isRemoved: true })
                    .where({ itemID: itemid, cartID: cartID, isActive: true, isRemoved: false })
                    .execute();
                console.log("here");
            }
            else if (menuExists && quantityint && quantityint > 0) {
                console.log("here2");
                let itemcategory = menuExists.Category || "";
                let itemdescription = menuExists.description || "";
                order["OrderItemDetailsList"][i]["category"] = itemcategory;
                order["OrderItemDetailsList"][i]["description"] = itemdescription;
                cartitemarray.push(order["OrderItemDetailsList"][i]);
                console.log(order["OrderItemDetailsList"][i]);
                yield app_data_source_1.default
                    .createQueryBuilder()
                    .update(TblCartItems_1.TblCartItems)
                    .set({ quantity: quantity, isActive: false })
                    .where({ itemID: itemid, cartID: cartID, isActive: true, isRemoved: false })
                    .execute();
            }
            ;
        }
        ;
        yield app_data_source_1.default
            .createQueryBuilder()
            .update(TblCart_1.TblCart)
            .set({ isActive: false })
            .where({ restaurantID: restaurantID, idCart: cartID, customerID: userid, isActive: true, isRemoved: false })
            .execute();
        returnobject["OrderItemDetailsList"] = cartitemarray;
        let result = yield (0, saveClientOrder_1.saveClientOrder)(returnobject);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        }
        else {
            /* After
        the middleware emits the data to the device through socket connection, the
        same data is sent back to the user who post it  */
            res
                .status(200)
                .json(result["success"]);
            return;
        }
        ;
    }
    catch (err) {
        res
            .status(500)
            .json(err);
        return;
    }
    ;
});
exports.userOrder = userOrder;
