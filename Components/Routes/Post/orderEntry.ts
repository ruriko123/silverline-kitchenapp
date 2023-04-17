import express from 'express';
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename).replace(/\.[^.]*$/,'');
import {Tblordertracker} from "@model/Tblordertracker";
import { Tblordertrackerdetails } from '@model/Tblordertrackerdetails';
import myDataSource from "@orm/app-data-source";
import {orderHistory,orderHistoryDetails} from "@reqtypes/orderHistory"
import { saveOrder } from 'Components/Middlewares/saveOrder';



router.post(`/${scriptName}`, async(req, res) => {



    try {
        let order:orderHistory=req?.body;
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


        let result =await saveOrder(order);
        if ("error" in result){
            res.status(500).json(result);
            return;
        } else{

            res.status(200).json(result["success"]);
            return;
        }

    } catch (err) {
        res.status(500).json(err);
        return;
    }
})

export { router };