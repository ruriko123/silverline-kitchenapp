import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";

const getThirdParties : RequestHandler = async(req, res) => {
    try {
        let userData = await myDataSource
            .getRepository(TblThirdparty).createQueryBuilder("*")
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

export {getThirdParties};