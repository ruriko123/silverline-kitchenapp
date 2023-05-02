import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const updateMenuItem : RequestHandler = async(req, res) => {
    try {
        let itemid = req.body
            ?.itemid;
        let updatedata:any = req?.body;
        let costPrice = updatedata?.costPrice;
        let sellingPrice=updatedata?.sellingPrice;
        let sellingPricewithTax = updatedata?.sellingPricewithTax;
        let description= updatedata?.description;


        if (!itemid ) {
            res
                .status(400)
                .json({"error": "Item ID missing."});
            return;
        };
        let menuItemdata = await myDataSource
            .getRepository(TblMenu)
            .findOne({
                where: {
                    idMenu: itemid
                }
            });
        if (!(menuItemdata)) {
            res
                .status(400)
                .json({"error": "Item does not exist."});
            return;
        } else {
            delete updatedata["itemid"];
            costPrice===0?costPrice=
            await myDataSource
            .createQueryBuilder()
            .update(TblMenu)
            .set(updatedata)
            .where({idMenu:itemid})
            .execute();



            res
                .status(200)
                .json({"success": "Item uploaded successfully."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {updateMenuItem};