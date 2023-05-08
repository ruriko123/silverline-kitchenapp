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
exports.saveClientOrder = void 0;
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const EmitOrder_1 = require("../../Socket/EmitOrder");
const user_Tblordertracker_1 = require("../../../ORM/entities/user_Tblordertracker");
const user_Tblordertrackerdetails_1 = require("../../../ORM/entities/user_Tblordertrackerdetails");
const saveClientOrder = (orderObject) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        let returnObject = {};
        let order = orderObject;
        const orderTracker = new user_Tblordertracker_1.user_Tblordertracker();
        orderTracker.outletOrderid = order.outlet_orderid;
        orderTracker.orderedat = order.orderedat;
        orderTracker.currentstate = order.currentstate;
        orderTracker.outletName = order.outletName;
        orderTracker.customerName = order.customerName;
        orderTracker.customerPhone = order.customerPhone;
        orderTracker.Address = order.Address;
        orderTracker.deliveryVia = order.deliveryVia;
        orderTracker.restaurantID = order.outletID;
        orderTracker.deliverycustomerName = ((_a = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _a === void 0 ? void 0 : _a.deliverycustomer_name) || order.customerName;
        orderTracker.deliverycustomerAddress = ((_b = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _b === void 0 ? void 0 : _b.deliverycustomerAddress) || order.Address;
        orderTracker.deliverycustomerPhone = ((_c = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _c === void 0 ? void 0 : _c.deliverycustomer_phone) || order.customerPhone;
        orderTracker.altdeliverycustomerPhone = ((_d = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _d === void 0 ? void 0 : _d.altdeliverycustomerPhone) || ((_e = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _e === void 0 ? void 0 : _e.deliverycustomer_phone) || order.customerPhone;
        yield app_data_source_1.default
            .manager
            .save(orderTracker);
        let primarykey = orderTracker.id;
        order["Id"] = primarykey;
        returnObject["outletOrderid"] = order.outlet_orderid;
        returnObject["outletID"] = order.outletID;
        returnObject["orderedat"] = order.orderedat;
        returnObject["currentstate"] = order.currentstate;
        returnObject["outletName"] = order.outletName;
        returnObject["customerName"] = ((_f = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _f === void 0 ? void 0 : _f.deliverycustomer_name) || order.customerName;
        ;
        returnObject["customerPhone"] = ((_g = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _g === void 0 ? void 0 : _g.deliverycustomer_phone) || ((_h = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _h === void 0 ? void 0 : _h.altdeliverycustomerPhone) || order.customerPhone;
        ;
        returnObject["Address"] = ((_j = order === null || order === void 0 ? void 0 : order.deliverycustomer) === null || _j === void 0 ? void 0 : _j.deliverycustomerAddress) || order.Address;
        ;
        returnObject["deliveryVia"] = order.deliveryVia;
        returnObject["Id"] = primarykey;
        returnObject["deliverycustomer"] = order.deliverycustomer;
        returnObject["total"] = order.total;
        returnObject["sub_total"] = order.sub_total;
        returnObject["nontaxable"] = order.nontaxable;
        returnObject["tax_amount"] = order.tax_amount;
        returnObject["delivery_charge"] = order.delivery_charge;
        returnObject["taxable"] = order.taxable;
        // returnObject["OrderItemDetailsList"]=[];
        let orderDetailsArr = [];
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
            let orderDetailsjson = {};
            let orderTrackerDetails = new user_Tblordertrackerdetails_1.user_Tblordertrackerdetails();
            let e = orderDetails[x];
            orderTrackerDetails.itemID = e.itemID;
            orderTrackerDetails.orderedat = order.orderedat;
            orderTrackerDetails.ordertrackerId = primarykey;
            orderTrackerDetails.itemname = e.itemname;
            orderTrackerDetails.quantity = e.quantity;
            orderTrackerDetails.modification = e.modification;
            // orderTrackerDetails.avgpreptime = e.avgpreptime;
            orderTrackerDetails.itemPrice = e.itemPrice;
            orderTrackerDetails.category = e.category;
            orderTrackerDetails.description = e.description;
            // orderTrackerDetails.productId = e.productId; orderTrackerDetails.unit =
            // e.unit;
            orderTrackerDetails.isTaxable = e.isTaxable;
            yield app_data_source_1.default
                .manager
                .save(orderTrackerDetails)
                .then((e) => {
                order["OrderItemDetailsList"][x]["idtblordertracker_details"] = orderTrackerDetails.idtblordertrackerDetails;
                orderDetailsjson["idtblordertracker_details"] = orderTrackerDetails.idtblordertrackerDetails;
                orderDetailsjson["orderedat"] = e.orderedat;
                orderDetailsjson["itemID"] = e.itemID;
                orderDetailsjson["ordertrackerId"] = primarykey;
                orderDetailsjson["itemname"] = e.itemname;
                orderDetailsjson["quantity"] = e.quantity;
                orderDetailsjson["modification"] = e.modification;
                orderDetailsjson["itemPrice"] = e.itemPrice;
                orderDetailsjson["category"] = e.category;
                orderDetailsjson["description"] = e.description;
                orderDetailsjson["isTaxable"] = e.isTaxable;
                // orderDetailsjson["unit"]=e.unit;
                orderDetailsArr.push(orderDetailsjson);
            });
        }
        ;
        returnObject["OrderItemDetailsList"] = orderDetailsArr;
        /* The outlet name is hashed and the json object is emitted on the hashed outlet name. The device is listening on this outlet name hash so it receives the orderdata just before it is saved to the db.*/
        (0, EmitOrder_1.emitOrder)(order.outletName, returnObject);
        let successdata = {
            "success": returnObject
        };
        /* After sending the data to the socket, it is also returned back to the route. */
        return successdata;
    }
    catch (err) {
        let errordata = {
            "error": `${err}`
        };
        return errordata;
    }
    ;
});
exports.saveClientOrder = saveClientOrder;
