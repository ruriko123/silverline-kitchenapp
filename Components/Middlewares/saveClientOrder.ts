import {Tblordertracker} from "@model/Tblordertracker";
import {Tblordertrackerdetails} from '@model/Tblordertrackerdetails';
import myDataSource from "@base/app-data-source";
import {orderHistory, orderHistoryDetails} from "@reqtypes/orderHistory"
import {emitOrder} from "../Socket/EmitOrder";

const saveClientOrder = async(orderObject : orderHistory) => {
    try {
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
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
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
                });
        };


        /* The outlet name is hashed and the json object is emitted on the hashed outlet name. The device is listening on this outlet name hash so it receives the orderdata just before it is saved to the db.*/
        emitOrder(order.outletName, orderObject);
        let successdata = {
            "success": orderObject
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

export {saveClientOrder};
