import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {TblCart} from '@base/ORM/entities/TblCart';
import {TblCartItems} from "@base/ORM/entities/TblCartItems";
import {TblRestaurant} from '@model/TblRestaurant';

const restaurantCart : RequestHandler = async(req, res) => {
    try {

        let token = req
            ?.headers
                ?.token;
        let restaurantID : number = req.body
            ?.restaurantID;

        let IDCart : number = req
            ?.body
                ?.IDCart;
        if (!token || !restaurantID || !IDCart) {
            res
                .status(400)
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
                .json({detail: "Restaurant does not exist."});
            return;
        };
        let cartExists = await myDataSource
            .getRepository(TblCart)
            .findOne({
                where: {
                    restaurantID: restaurantID,
                    idCart: IDCart,
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

        let cartItems = await myDataSource
            .getRepository(TblCartItems)
            .createQueryBuilder("t")
            .select([
                "t.idCartitem",
                "t.itemID",
                "t.ItemName",
                "t.costPrice",
                "t.sellingPrice",
                "t.sellingPricewithTax",
                "t.quantity",
                "t.Taxable"
            ])
            .where({cartID: IDCart, isRemoved: false, isActive: true})
            .getMany();

        if (!cartItems) {
            res
                .status(400)
                .json({detail: "Error while fetching cart items."});
            return;
        }

        let receiptjson = {
            total: "",
            subtotal: "",
            deliverycharge: ""
        };
        let idrestaurant = restaurantExists.id;

        interface restaurantreturndetails {
            Name:string;
            description:string;
            location:string;
            cartID:number;
            idrestaurant:number;
        }
        let restaurantdetails:restaurantreturndetails = {
            Name: restaurantExists
                ?.Name || "",
            description: restaurantExists
                ?.slogan || restaurantExists
                    ?.details || "",
            location: restaurantExists
                ?.Address || "",
            cartID:cartExists.idCart,
            idrestaurant:idrestaurant
        };
        res
            .status(200)
            .json({items: cartItems, receipt: receiptjson, restaurant: restaurantdetails});
        return;
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {restaurantCart};