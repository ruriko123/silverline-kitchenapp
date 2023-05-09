import {RequestHandler} from "express";
import {TbloperatingLocations} from "@model/TbloperatingLocations";
import myDataSource from "@base/app-data-source";

const getActiveOperatingLocations : RequestHandler = async(req, res) => {
    try {
        let userData = await myDataSource
            .getRepository(TbloperatingLocations).createQueryBuilder("t").select(["t.id","t.LocationName","t.IMAGEURL","t.isActive"])
            .where({isActive:true})
            .getMany();
        if(!userData){
            res
            .status(400)
            .json({"error": "No data available."});
        return;
        };
            res
                .status(200)
                .json(userData);
            return;
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {getActiveOperatingLocations};