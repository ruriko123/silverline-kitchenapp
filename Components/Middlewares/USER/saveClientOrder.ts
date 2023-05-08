import myDataSource from "@base/app-data-source";
import {user_orderHistory, user_orderHistoryDetails, deliverycustomerobject} from "@reqtypes/orderHistory"
import {emitOrder} from "../../Socket/EmitOrder";
import {user_Tblordertracker} from '@model/user_Tblordertracker';
import {user_Tblordertrackerdetails} from '@model/user_Tblordertrackerdetails';




const saveClientOrder = async(orderObject : user_orderHistory) => {
    try {

        let returnObject : any = {};
        let order : user_orderHistory = orderObject;
        const orderTracker = new user_Tblordertracker();
        orderTracker.outletOrderid = order.outlet_orderid;
        orderTracker.orderedat = order.orderedat;
        orderTracker.currentstate = order.currentstate;
        orderTracker.outletName = order.outletName;
        orderTracker.customerName = order.customerName;
        orderTracker.customerPhone = order.customerPhone;
        orderTracker.Address = order.Address;
        orderTracker.deliveryVia = order.deliveryVia;
        orderTracker.restaurantID = order.outletID;
        orderTracker.deliverycustomerName = order
            ?.deliverycustomer
                ?.deliverycustomer_name || order.customerName;
        orderTracker.deliverycustomerAddress = order
            ?.deliverycustomer
                ?.deliverycustomerAddress || order.Address;
        orderTracker.deliverycustomerPhone = order
            ?.deliverycustomer
                ?.deliverycustomer_phone || order.customerPhone;
        orderTracker.altdeliverycustomerPhone = order
            ?.deliverycustomer
                ?.altdeliverycustomerPhone || order
                    ?.deliverycustomer
                        ?.deliverycustomer_phone || order.customerPhone;

        await myDataSource
            .manager
            .save(orderTracker);
        let primarykey = orderTracker.id;

        order["Id"] = primarykey;
        returnObject["outletOrderid"] = order.outlet_orderid;
        returnObject["outletID"] = order.outletID;
        returnObject["orderedat"] = order.orderedat;
        returnObject["currentstate"] = order.currentstate;
        returnObject["outletName"] = order.outletName;
        returnObject["customerName"] = order
            ?.deliverycustomer
                ?.deliverycustomer_name || order.customerName;;
        returnObject["customerPhone"] = order
            ?.deliverycustomer
                ?.deliverycustomer_phone || order
                    ?.deliverycustomer
                        ?.altdeliverycustomerPhone || order.customerPhone;;
        returnObject["Address"] = order
            ?.deliverycustomer
                ?.deliverycustomerAddress || order.Address;;
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
        let orderDetailsArr : any = [];
        let orderDetails = order["OrderItemDetailsList"];
        for (let x = 0; x < orderDetails.length; x++) {
            let orderDetailsjson : any = {};
            let orderTrackerDetails = new user_Tblordertrackerdetails();
            let e : user_orderHistoryDetails = orderDetails[x];
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
            await myDataSource
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
                    orderDetailsArr.push(orderDetailsjson)
                });
        };
        returnObject["OrderItemDetailsList"] = orderDetailsArr;
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

export {saveClientOrder};
