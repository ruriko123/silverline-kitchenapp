import {RequestHandler} from "express";
import {TblAdmin} from "@model/TblAdmin";
import myDataSource from "@base/app-data-source";



const viewAllAdmin : RequestHandler = async(req, res) => {
    try {
        let userData = await myDataSource
            .getRepository(TblAdmin).createQueryBuilder("t").select(["t.id","t.isActive","t.userName","t.isMainAdmin"])
            .getMany();
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

export {viewAllAdmin};