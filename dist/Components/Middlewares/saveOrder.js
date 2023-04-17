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
exports.saveOrder = void 0;
const Tblordertracker_1 = require("../../ORM/entities/Tblordertracker");
const Tblordertrackerdetails_1 = require("../../ORM/entities/Tblordertrackerdetails");
const app_data_source_1 = __importDefault(require("../../ORM/app-data-source"));
const EmitOrder_1 = require("../Controllers/Socket/EmitOrder");
const saveOrder = (orderObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order = orderObject;
        const orderTracker = new Tblordertracker_1.Tblordertracker();
        orderTracker.outletOrderid = order.outlet_orderid;
        orderTracker.kotid = order.kotid;
        orderTracker.orderedat = order.orderedat;
        orderTracker.tablenum = order.tablenum;
        orderTracker.employee = order.employee;
        orderTracker.ordertype = order.ordertype;
        orderTracker.currentstate = order.currentstate;
        orderTracker.outletName = order.outletName;
        orderTracker.guestCount = order.guestCount;
        yield app_data_source_1.default
            .manager
            .save(orderTracker);
        let primarykey = orderTracker.id;
        order["Id"] = primarykey;
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
            let orderTrackerDetails = new Tblordertrackerdetails_1.Tblordertrackerdetails();
            let e = orderDetails[x];
            orderTrackerDetails.orderedat = e.orderedat;
            orderTrackerDetails.ordertrackerId = primarykey;
            orderTrackerDetails.itemname = e.itemname;
            orderTrackerDetails.quantity = e.quantity;
            orderTrackerDetails.modification = e.modification;
            orderTrackerDetails.avgpreptime = e.avgpreptime;
            orderTrackerDetails.itemPrice = e.itemPrice;
            orderTrackerDetails.category = e.category;
            orderTrackerDetails.description = e.description;
            orderTrackerDetails.productId = e.productId;
            orderTrackerDetails.unit = e.unit;
            orderTrackerDetails.isTaxable = e.isTaxable;
            yield app_data_source_1.default
                .manager
                .save(orderTrackerDetails).then((e) => {
                order["OrderItemDetailsList"][x]["idtblordertracker_details"] = orderTrackerDetails.idtblordertrackerDetails;
            });
        }
        (0, EmitOrder_1.emitOrder)(order.outletName, orderObject);
        let successdata = { "success": orderObject };
        return successdata;
    }
    catch (err) {
        let errordata = { "error": `${err}` };
        return errordata;
    }
});
exports.saveOrder = saveOrder;
