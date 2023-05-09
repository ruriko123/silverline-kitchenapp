import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import { TblAdmin } from '@model/TblAdmin';



const AdminActive : RequestHandler = async(req, res) => {
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
                    id: id
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "Admin with this ID does not exist."});
            return;
        } else {
            await myDataSource
                .createQueryBuilder()
                .update(TblAdmin)
                .set({ isActive:true})
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
            .json({detail: error});
        return;
    };
};

export {AdminActive};