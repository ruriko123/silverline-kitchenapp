import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const getMenu : RequestHandler = async(req, res) => {
    try {

        let restaurantID = req.body
            ?.restaurantID;

        if (!restaurantID) {
            res
                .status(400)
                .json({"error": "Missing Parameters."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    id: restaurantID
                }
            });
        if (!(userData)) {
            res
                .status(400)
                .json({"error": "Restaurant does not exist."});
            return;
        } else {

            let menudata = await myDataSource
                .getRepository(TblMenu)
                .createQueryBuilder("")
                .select([
                    "IDMenu",
                    "Category",
                    "ItemName",
                    "costPrice",
                    "sellingPrice",
                    "sellingPricewithTax",
                    "description",
                    "restaurantID",
                    "Taxable",
                    "isActive"
                ])
                .where({restaurantID: restaurantID})
                .getRawMany() || [];

            console.log(menudata)
            res
                .status(200)
                .json(menudata);
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {getMenu};