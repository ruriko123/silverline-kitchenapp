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




const userOrder : RequestHandler = async(req, res) => {
    try {
        let token = req
            ?.headers
                ?.token;

        if (!token) {
            res
                .status(400)
                .json({detail: "Missing parameters."});
            return;
        };

        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(400)
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

            console.log(orderitem.quantity, quantity)
            let menuExists = await myDataSource
                .getRepository(TblMenu)
                .findOne({
                    where: {
                        idMenu: itemid,
                        restaurantID: restaurantID
                    }
                });
            console.log(menuExists)
            if (!quantity || quantity === 0) {
                await myDataSource
                    .createQueryBuilder()
                    .update(TblCartItems)
                    .set({isActive: false, isRemoved: true})
                    .where({itemID: itemid, cartID: cartID, isActive: true, isRemoved: false})
                    .execute();
                console.log("here")
            } else if (menuExists && quantityint && quantityint > 0) {
                console.log("here2")
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
        await myDataSource
            .createQueryBuilder()
            .update(TblCart)
            .set({isActive: false})
            .where({restaurantID: restaurantID, idCart: cartID, customerID: userid, isActive: true, isRemoved: false})
            .execute();

        returnobject["OrderItemDetailsList"] = cartitemarray;
        let result = await saveClientOrder(returnobject);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        } else {
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
