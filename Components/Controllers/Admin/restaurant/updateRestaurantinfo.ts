import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import myDataSource from "@base/app-data-source";
import { typeTblRestaurant } from '@reqtypes/orderHistory';
import {Not} from "typeorm";



const updateRestaurantinfo : RequestHandler = async(req, res) => {
    try {
        let restaurantData:typeTblRestaurant = req.body;
        let id = parseInt(req.body?.id);
        let Outlet_Name = req.body
        ?.Name;
        let modifiedby : string = req.session
        ?.adminName || "";
        if(!Outlet_Name||!id){
            res
                .status(400)
                .json({error: "Outlet Name or ID not supplied."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    Name: `${Outlet_Name}`,
                    id: Not(id)
                }
            });
        if (userData) {
            res
                .status(400)
                .json({error: "Restaurant Name already exists. Try another name."});
            return;
        } else {
            restaurantData.lastModifiedBy=modifiedby;
            await myDataSource
            .createQueryBuilder()
            .update(TblRestaurant)
            .set(restaurantData)
            .where("id = :id", {id: id})
            .execute();
            res
                .status(200)
                .json({"success": "Restautant Updated."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {updateRestaurantinfo};