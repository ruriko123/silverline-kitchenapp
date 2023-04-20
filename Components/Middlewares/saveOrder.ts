import {Tblordertracker} from "@model/Tblordertracker";
import {TblThirdparty} from "@model/TblThirdparty";

import {Tblordertrackerdetails} from '@model/Tblordertrackerdetails';
import myDataSource from "@base/app-data-source";
import {orderHistory, orderHistoryDetails} from "@reqtypes/orderHistory"
import {emitOrder} from "../Socket/EmitOrder";


const saveOrder = async(orderObject : orderHistory) => {
    try {
        let returnObject:any={};
        let order : orderHistory = orderObject;
        const orderTracker = new Tblordertracker();
        orderTracker.outletOrderid = order.outlet_orderid;
        // orderTracker.kotid = order.kotid;
        orderTracker.orderedat = order.orderedat;
        // orderTracker.tablenum = order.tablenum;
        // orderTracker.employee = order.employee;
        // orderTracker.ordertype = order.ordertype;
        orderTracker.currentstate = order.currentstate;
        orderTracker.outletName = order.outletName;
        // orderTracker.guestCount = order.guestCount;
        orderTracker.customerName=order.customerName;
        orderTracker.customerPhone=order.customerPhone;
        orderTracker.Address=order.Address;
        orderTracker.deliveryVia=order.deliveryVia;
        await myDataSource
            .manager
            .save(orderTracker);
        let primarykey = orderTracker.id;


        order["Id"] = primarykey;
        returnObject["outletOrderid"]=order.outlet_orderid;
        returnObject["orderedat"]=order.orderedat;
        returnObject["currentstate"]=order.currentstate;
        returnObject["outletName"]=order.outletName;
        returnObject["customerName"]=order.customerName;
        returnObject["customerPhone"]=order.customerPhone;
        returnObject["Address"]=order.Address;
        returnObject["deliveryVia"]=order.deliveryVia;
        returnObject["Id"]=primarykey;
        // returnObject["OrderItemDetailsList"]=[];
        let orderDetailsArr:any=[];
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
            let orderDetailsjson:any={};
            let orderTrackerDetails = new Tblordertrackerdetails();
            let e : orderHistoryDetails = orderDetails[x];
            orderTrackerDetails.orderedat = e.orderedat;
            orderTrackerDetails.ordertrackerId = primarykey;
            orderTrackerDetails.itemname = e.itemname;
            orderTrackerDetails.quantity = e.quantity;
            orderTrackerDetails.modification = e.modification;
            // orderTrackerDetails.avgpreptime = e.avgpreptime;
            orderTrackerDetails.itemPrice = e.itemPrice;
            orderTrackerDetails.category = e.category;
            orderTrackerDetails.description = e.description;
            // orderTrackerDetails.productId = e.productId;
            orderTrackerDetails.unit = e.unit;
            orderTrackerDetails.isTaxable = e.isTaxable;
            await myDataSource
                .manager
                .save(orderTrackerDetails)
                .then((e) => {
                    order["OrderItemDetailsList"][x]["idtblordertracker_details"] = orderTrackerDetails.idtblordertrackerDetails;
                    orderDetailsjson["idtblordertracker_details"]= orderTrackerDetails.idtblordertrackerDetails;
                    orderDetailsjson["orderedat"]=e.orderedat;
                    orderDetailsjson["ordertrackerId"]=primarykey;
                    orderDetailsjson["itemname"]=e.itemname;
                    orderDetailsjson["quantity"]=e.quantity;
                    orderDetailsjson["modification"]=e.modification;
                    orderDetailsjson["itemPrice"]=e.itemPrice;
                    orderDetailsjson["category"]=e.category;
                    orderDetailsjson["description"]=e.description;
                    orderDetailsjson["isTaxable"]=e.isTaxable;
                    orderDetailsjson["unit"]=e.unit;
                    orderDetailsArr.push(orderDetailsjson)



                });
        };
        returnObject["OrderItemDetailsList"]=orderDetailsArr;
        /* The outlet name is hashed and the json object is emitted on the hashed outlet name. The device is listening on this outlet name hash so it receives the orderdata just before it is saved to the db.*/
        emitOrder(order.outletName, returnObject);
        let successdata = {
            "success": returnObject
        };


        /* After sending the data to the socket, it is also returned back to the route. */
        return successdata;
    } catch (err) {
        let errordata = {
            "error": `${err}`
        };
        return errordata;
    };


};

export {saveOrder};
