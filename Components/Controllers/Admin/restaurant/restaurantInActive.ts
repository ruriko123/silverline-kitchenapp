import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import { TblRestaurant } from '@model/TblRestaurant';

const restaurantInActive : RequestHandler = async(req, res) => {

    try {

        let id : number = req.body
            ?.id;
        if (!id) {
            res
                .status(401)
                .json({"error": "Restaurant ID not supplied."});
            return;
        }
        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    id: id
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({"error": "Restaurant with this ID does not exist."});
            return;
        } else {

            await myDataSource
                .createQueryBuilder()
                .update(TblRestaurant)
                .set({ isActive:true})
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Restaurant made Inactive."});
            return;
        }

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;

    };

};

export {restaurantInActive};