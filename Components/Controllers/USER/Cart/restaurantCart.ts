import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {TblCart} from '@base/ORM/entities/TblCart';
import {TblCartItems} from "@base/ORM/entities/TblCartItems";

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
                "t.cartID",
                "t.itemID",
                "t.ItemName",
                "t.costPrice",
                "t.sellingPrice",
                "t.sellingPricewithTax",
                "t.quantity"
            ])
            .where({cartID: IDCart, isRemoved: false, isActive: true})
            .getMany();

        if (!cartItems) {
            res
                .status(400)
                .json({detail: "Error while fetching cart items."});
            return;
        }
        
        let receiptjson = {total:"",subtotal:"",deliverycharge:""}
        res
            .status(200)
            .json({items:cartItems,receipt:receiptjson});
        return;
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {restaurantCart};