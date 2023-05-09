import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import { TbloperatingLocations } from '@model/TbloperatingLocations';


const activeOperatingLocation : RequestHandler = async(req, res) => {
    try {
        let id : number = req.body
            ?.id;
        if (!id) {
            res
                .status(401)
                .json({"error": "ID not supplied."});
            return;
        };
        let locationexists = await myDataSource
            .getRepository(TbloperatingLocations)
            .findOne({
                where: {
                    id: id
                }
            });
        if (!locationexists) {
            res
                .status(400)
                .json({detail: "Wrong ID supplied."});
            return;
        } else {
            await myDataSource
                .createQueryBuilder()
                .update(TbloperatingLocations)
                .set({ isActive:true})
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Operating location made active."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {activeOperatingLocation};