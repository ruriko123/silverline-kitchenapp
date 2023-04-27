import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import { TbloperatingLocations } from '@model/TbloperatingLocations';


const InactiveOperatingLocation : RequestHandler = async(req, res) => {
    try {
        let id : number = req.body
            ?.id;
        if (!id) {
            res
                .status(401)
                .json({"error": "ID not supplied."});
            return;
        }
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
                .json({"error": "Wrong ID supplied."});
            return;
        } else {

            await myDataSource
                .createQueryBuilder()
                .update(TbloperatingLocations)
                .set({ isActive:false})
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Operating location made inactive."});
            return;
        };

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;

    };

};

export {InactiveOperatingLocation};