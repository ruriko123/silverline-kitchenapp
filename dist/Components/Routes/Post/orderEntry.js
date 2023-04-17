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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var path = require('path');
var scriptName = path.basename(__filename).replace(/\.[^.]*$/, '');
const saveOrder_1 = require("../../../Components/Middlewares/saveOrder");
router.post(`/${scriptName}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order = req === null || req === void 0 ? void 0 : req.body;
        // const orderTracker = new Tblordertracker();
        // const orderTrackerDetails=new Tblordertrackerdetails();
        // orderTracker.outletOrderid=order.outlet_orderid;
        // orderTracker.kotid=order.kotid;
        // orderTracker.orderedat=order.orderedat;
        // orderTracker.tablenum=order.tablenum;
        // orderTracker.employee=order.employee;
        // orderTracker.ordertype=order.ordertype;
        // orderTracker.currentstate=order.currentstate;
        // orderTracker.outletName=order.outletName;
        // orderTracker.guestCount=order.guestCount;
        // await myDataSource.manager.save(orderTracker);
        // let primarykey=orderTracker.id;
        // order["id"]=primarykey;
        // let orderDetails=order["OrderItemDetailsList"];
        // for (let x =0;x<orderDetails.length;x++){
        //     let e = orderDetails[x];
        //     orderTrackerDetails.orderedat=e.orderedat;
        //     orderTrackerDetails.ordertrackerId=primarykey;
        //     orderTrackerDetails.itemname=e.itemname;
        //     orderTrackerDetails.quantity=e.quantity;
        //     orderTrackerDetails.modification=e.modification;
        //     orderTrackerDetails.avgpreptime=e.avgpreptime;
        //     orderTrackerDetails.itemPrice=e.itemPrice;
        //     orderTrackerDetails.category=e.category;
        //     orderTrackerDetails.description=e.description;
        //     orderTrackerDetails.productId=e.productId;
        //     orderTrackerDetails.unit=e.unit;
        //     orderTrackerDetails.isTaxable=e.isTaxable;
        //     await myDataSource.manager.save(orderTrackerDetails)
        //     order["OrderItemDetailsList"][x]["idtblordertracker_details"]=orderTrackerDetails.idtblordertrackerDetails;
        // }
        let result = yield (0, saveOrder_1.saveOrder)(order);
        if ("error" in result) {
            res.status(500).json(result);
            return;
        }
        else {
            res.status(200).json(result["success"]);
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
}));
