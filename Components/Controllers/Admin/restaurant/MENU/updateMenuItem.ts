import {RequestHandler} from "express";
import {TblRestaurant} from "@model/TblRestaurant";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const updateMenuItem : RequestHandler = async(req, res) => {
    try {
        let itemid = req.body
            ?.itemid;
        let updateditems = req?.body;

        if (!itemid ) {
            res
                .status(400)
                .json({detail: "Item ID missing."});
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
                .json({detail: "Item does not exist."});
            return;
        } else {
            delete updateditems["itemid"];
            await myDataSource
            .createQueryBuilder()
            .update(TblMenu)
            .set(updateditems)
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
            .json({detail: error});
        return;
    };
};

export {updateMenuItem};