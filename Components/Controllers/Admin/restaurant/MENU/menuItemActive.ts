import {RequestHandler} from "express";
import {TblMenu} from "@model/TblMenu";
import myDataSource from "@base/app-data-source";

const menuItemActive : RequestHandler = async(req, res) => {
    try {

        let itemID = req.body
            ?.itemID;

        if (!itemID) {
            res
                .status(400)
                .json({error: "Missing Parameters."});
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
                .json({error: "Item does not exist."});
            return;
        } else {

            await myDataSource
            .createQueryBuilder()
            .update(TblMenu)
            .set({ isActive:true})
            .where({idMenu: itemID})
            .execute();

            res
            .status(200)
            .json({"success": "Item made active."});
        return;
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {menuItemActive};