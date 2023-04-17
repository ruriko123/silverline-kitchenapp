import express from 'express';
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename).replace(/\.[^.]*$/,'');
import {Tblordertracker} from "@model/Tblordertracker";
import { Tblordertrackerdetails } from '@model/Tblordertrackerdetails';
import myDataSource from "@orm/app-data-source";
import {orderHistory,orderHistoryDetails} from "@reqtypes/orderHistory"


router.post(`/${scriptName}`, async(req, res) => {



    try {
        // const {username, email, password} = req?.body;

        let order:orderHistory=req?.body;
        const orderTracker = new Tblordertracker();
        const orderTrackerDetails=new Tblordertrackerdetails();
        orderTracker.outletOrderid=order.outlet_orderid;
        orderTracker.kotid=order.kotid;
        orderTracker.orderedat=order.orderedat;
        orderTracker.tablenum=order.tablenum;
        orderTracker.employee=order.employee;
        orderTracker.ordertype=order.ordertype;
        orderTracker.currentstate=order.currentstate;
        orderTracker.outletName=order.outletName;
        orderTracker.guestCount=order.guestCount;
        await myDataSource.manager.save(orderTracker);
        let primarykey=orderTracker.id;
        order["id"]=primarykey;
        let orderDetails=order["OrderItemDetailsList"];
        orderDetails.forEach(async(e:orderHistoryDetails,index)=>{
            orderTrackerDetails.orderedat=e.orderedat;
            orderTrackerDetails.ordertrackerId=primarykey;
            orderTrackerDetails.itemname=e.itemname;
            orderTrackerDetails.quantity=e.quantity;
            orderTrackerDetails.modification=e.modification;
            orderTrackerDetails.avgpreptime=e.avgpreptime;
            orderTrackerDetails.itemPrice=e.itemPrice;
            orderTrackerDetails.category=e.category;
            orderTrackerDetails.description=e.description;
            orderTrackerDetails.productId=e.productId;
            orderTrackerDetails.unit=e.unit;
            orderTrackerDetails.isTaxable=e.isTaxable;
            await myDataSource.manager.save(orderTrackerDetails)
            order["OrderItemDetailsList"][index]["idtblordertracker_details"]=orderTrackerDetails.idtblordertrackerDetails;
        });



        res.status(200).json(order);
        return;

    } catch (err) {
        res.status(500).json(err);
        return;
    }
})

export { router };