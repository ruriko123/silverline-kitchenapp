import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {saveClientOrder} from "@base/Components/Middlewares/USER/saveClientOrder";
import {user_orderHistory, deliverycustomerobject,user_orderHistoryDetails} from '@reqtypes/orderHistory';
import {TblRestaurant} from '@model/TblRestaurant';
import {TblMenu} from '@model/TblMenu';
import {TblCart} from '@base/ORM/entities/TblCart';
import {TblCartItems} from '@base/ORM/entities/TblCartItems';
import { checkOpenOrClosed } from "@utils/USER/restaurantdatafilters";
import moment, {tz} from "moment-timezone";
moment().format();




const userOrder : RequestHandler = async(req, res) => {
    try {
        let token = req
            ?.headers
                ?.token;

        if (!token) {
            res
                .status(303)
                .json({detail: "Missing parameters."});
            return;
        };

        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(303)
                .json({detail: "error while reading token."});
            return;
        };
        let userid : number = tokendata
            ?.id;
        let userdisplayname : string = tokendata
            ?.displayname;
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    displayname: `${userdisplayname}`
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User not found."});
            return;
        };

       
        let deliverycustomer:deliverycustomerobject = req?.body?.deliverycustomer;

        if(!deliverycustomer?.deliverycustomer_name){
            res
            .status(400)
            .json({detail: "Delivery customer name missing."});
        return;
        }

        if(!deliverycustomer?.deliverycustomer_phone){
            res
            .status(400)
            .json({detail: "Delivery customer phone missing."});
        return;
        }
        if(!deliverycustomer?.deliverycustomerAddress){
            res
            .status(400)
            .json({detail: "Delivery customer address missing."});
        return;
        }


        let deliveryCharge:number=req?.body?.delivery_charge;
        let Total:number = req?.body?.total;
        let subTotal:number = req?.body?.sub_total;
        let nontaxable:number = req?.body?.nontaxable;
        let taxAmount:number = req?.body?.tax_amount;
        let taxable:number = req?.body?.taxable;


        if(!taxable && !(taxable===0)){
            res
            .status(400)
            .json({detail: "Taxable amount missing."});
        return;
        };

        if(!taxAmount && !(taxAmount===0)){
            res
            .status(400)
            .json({detail: "Tax amount missing."});
        return;
        };


        if(!nontaxable  && !(nontaxable===0)){
            res
            .status(400)
            .json({detail: "Non-taxable amount missing."});
        return;
        };

        if(!subTotal  && !(subTotal===0)){
            res
            .status(400)
            .json({detail: "SubTotal amount missing."});
        return;
        };



        if(!Total   && !(Total===0)){
            res
            .status(400)
            .json({detail: "Total amount missing."});
        return;
        };



        if(!deliveryCharge && !(deliveryCharge===0)){
            res
            .status(400)
            .json({detail: "Delivery charge missing."});
        return;
        };



        let cartID = req
            ?.body
                ?.outlet_orderid;
        let restaurantID = req
            ?.body
                ?.outletID;

        if(!cartID||!restaurantID){
            res
            .status(400)
            .json({detail: "outletID or outlet_orderid missing."});
        return;
        }
        let cartExists = await myDataSource
            .getRepository(TblCart)
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
                .json({detail: "Cart does not exist."});
            return;
        };

        let restaurantExists = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    id: restaurantID
                }
            });

        if (!restaurantExists) {
            res
                .status(400)
                .json({detail: "Incorrect restaurant id supplied."});
            return;
        }

        let checkopen = await checkOpenOrClosed(restaurantExists);
        if(!checkopen){
            res
                .status(400)
                .json({detail: "Restaurant is currently closed."});
            return;
        }




        let order : user_orderHistory = req
            ?.body;
        order["outletName"] = restaurantExists.Name || `${restaurantID}`;
        order["customerName"] = userData
            ?.displayname || "";
        order["customerPhone"] = userData
            ?.phone || "";
        order["Address"] = userData
            ?.locationName || "";

        let returnobject : any = order;

        let cartitemarray : any = [];
        for (let i in order["OrderItemDetailsList"]) {
            console.log("inside", i)
            let orderitem : any = order["OrderItemDetailsList"][i];
            let itemid = orderitem
                ?.itemID;
            let quantityint = parseInt(orderitem
                ?.quantity || "0");
            let quantity = parseFloat(orderitem
                ?.quantity || "0.00");

            let menuExists = await myDataSource
                .getRepository(TblMenu)
                .findOne({
                    where: {
                        idMenu: itemid,
                        restaurantID: restaurantID
                    }
                });
            if (!quantity || quantity === 0) {
                await myDataSource
                    .createQueryBuilder()
                    .update(TblCartItems)
                    .set({isActive: false, isRemoved: true})
                    .where({itemID: itemid, cartID: cartID, isActive: true, isRemoved: false})
                    .execute();
            } else if (menuExists && quantityint && quantityint > 0) {
                let itemcategory = menuExists.Category || "";
                let itemdescription = menuExists.description || "";
                order["OrderItemDetailsList"][i]["category"] = itemcategory;
                order["OrderItemDetailsList"][i]["description"] = itemdescription;
                cartitemarray.push(order["OrderItemDetailsList"][i]);
                console.log(order["OrderItemDetailsList"][i])
                await myDataSource
                    .createQueryBuilder()
                    .update(TblCartItems)
                    .set({quantity: quantity, isActive: false})
                    .where({itemID: itemid, cartID: cartID, isActive: true, isRemoved: false})
                    .execute();
            };

        };



    



        let checkoutAt=req?.body?.orderedat||"00:00:00";

        // checkoutAt=await moment(checkoutAt, "hh:mm:ss").format("hh:mm a");
        
        await myDataSource
            .createQueryBuilder()
            .update(TblCart)
            .set({checkoutAt:checkoutAt,taxable:taxable,taxAmount:taxAmount,isActive: false,deliveryCharge:deliveryCharge,Total:Total,subTotal:subTotal,nontaxable:nontaxable})
            .where({restaurantID: restaurantID, idCart: cartID, customerID: userid, isActive: true, isRemoved: false})
            .execute();

        returnobject["OrderItemDetailsList"] = cartitemarray;
        returnobject["userid"]=userid;
        let result = await saveClientOrder(returnobject);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        } else {
            let loyalitypricepercent:number = parseInt(`${process.env.LoyalityPointPC}`)||1;
            let pointsEarned =((loyalitypricepercent/100) *  Total)||0;
            
            let userpoints = userData.points||0.00;
            userpoints = userpoints+pointsEarned;
            await myDataSource
            .createQueryBuilder()
            .update(Tbluser)
            .set({points:userpoints})
            .where("id = :id", {id: userid})
            .execute();

            /* After
        the middleware emits the data to the device through socket connection, the
        same data is sent back to the user who post it  */
            res
                .status(200)
                .json(result["success"]);
            return;
        };
    } catch (err) {
        res
            .status(500)
            .json(err);
        return;
    };
};

export {userOrder};
