import {Tblordertracker} from "@model/Tblordertracker";
import {Tblordertrackerdetails} from '@model/Tblordertrackerdetails';
import myDataSource from "@orm/app-data-source";
import {orderHistory, orderHistoryDetails} from "@reqtypes/orderHistory"
import { emitOrder } from "../Controllers/Socket/EmitOrder";




const saveOrder = async(orderObject : orderHistory) => {
    try {
        let order : orderHistory = orderObject;
        const orderTracker = new Tblordertracker();
        orderTracker.outletOrderid = order.outlet_orderid;
        orderTracker.kotid = order.kotid;
        orderTracker.orderedat = order.orderedat;
        orderTracker.tablenum = order.tablenum;
        orderTracker.employee = order.employee;
        orderTracker.ordertype = order.ordertype;
        orderTracker.currentstate = order.currentstate;
        orderTracker.outletName = order.outletName;
        orderTracker.guestCount = order.guestCount;
        await myDataSource
            .manager
            .save(orderTracker);
        let primarykey = orderTracker.id;
        order["Id"] = primarykey;
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
            let orderTrackerDetails = new Tblordertrackerdetails();
            let e:orderHistoryDetails = orderDetails[x];
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
            await myDataSource
                .manager
                .save(orderTrackerDetails).then((e)=>{
                    order["OrderItemDetailsList"][x]["idtblordertracker_details"] = orderTrackerDetails.idtblordertrackerDetails;
                })
        }
        emitOrder(order.outletName,orderObject)
        let successdata = {"success":orderObject}
        return successdata;

    } catch (err) {
        let errordata = {"error":`${err}`}
        return errordata;
    }

}


export {saveOrder};
