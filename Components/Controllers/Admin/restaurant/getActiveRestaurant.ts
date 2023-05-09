import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import myDataSource from "@base/app-data-source";

const getActiveRestaurant : RequestHandler = async(req, res) => {
    try {
        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .find({
                where: {
                    isActive: true
                }
            });
        if (!userData || userData.length<1) {
            res
                .status(400)
                .json({detail: "No data available."});
            return;
        } else {
            res
                .status(200)
                .json(userData);
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {getActiveRestaurant};