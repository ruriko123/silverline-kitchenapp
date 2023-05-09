import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {TblCart} from '@base/ORM/entities/TblCart';
import {TblRestaurant} from '@model/TblRestaurant';

const customerCart : RequestHandler = async(req, res) => {
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

        let cart = await myDataSource
        .getRepository(TblCart)
        .createQueryBuilder("t")
        .select([
            "t.idCart",
            "t.restaurantID",
        ])
        .where({customerID:userid, isRemoved: false, isActive: true})
        .getMany();


        if (!cart) {
            res
                .status(400)
                .json({detail: "Cart is empty."});
            return;
        } else {
            let cartdata:any = cart;
            for (let i in cart){
                let restaurantid = cart[i]?.restaurantID;
                let restaurant = await myDataSource
                .getRepository(TblRestaurant)
                .createQueryBuilder("x")
                .select([
                    "x.Name",
                    "x.Address",
                    "x.logo",
                    "x.details"
                ])
                .where({id:restaurantid,isActive:true})
                .getOne();
                if(restaurant){
                    cartdata[i]["restaurantDetails"]=restaurant;
                } else {
                    delete cartdata[i];
                };
            };
            res
                .status(200)
                .json(cartdata);
            return;
        }



        
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {customerCart};