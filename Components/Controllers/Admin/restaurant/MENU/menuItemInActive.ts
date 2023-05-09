import {RequestHandler} from "express";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const menuItemInActive : RequestHandler = async(req, res) => {
    try {

        let itemID = req.body
            ?.itemID;

        if (!itemID) {
            res
                .status(400)
                .json({detail: "Missing Parameters."});
            return;
        };
        let menuExists = await myDataSource
            .getRepository(TblMenu)
            .findOne({
                where: {
                    idMenu: itemID
                }
            });
        if (!(menuExists)) {
            res
                .status(400)
                .json({detail: "Item does not exist."});
            return;
        } else {

            await myDataSource
            .createQueryBuilder()
            .update(TblMenu)
            .set({ isActive:false})
            .where({idMenu: itemID})
            .execute();

            res
            .status(200)
            .json({"success": "Item made inactive."});
        return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {menuItemInActive};