import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import { TblAdmin } from '@model/TblAdmin';


const AdminInActive : RequestHandler = async(req, res) => {
    try {
        let id : number = req.body
            ?.id;
        if (!id) {
            res
                .status(401)
                .json({"error": "Admin ID not supplied."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblAdmin)
            .findOne({
                where: {
                    id: id,
                    isMainAdmin:false
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({error: "Admin with this ID does not exist or cannot be made inactive."});
            return;
        } else {
            await myDataSource
                .createQueryBuilder()
                .update(TblAdmin)
                .set({ isActive:false})
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Admin made active."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {AdminInActive};