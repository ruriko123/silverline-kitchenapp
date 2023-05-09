import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";

const thirdPartyactive : RequestHandler = async(req, res) => {
    try {
        let id : number = req.body
            ?.id;
        if (!id) {
            res
                .status(401)
                .json({"error": "Third Party ID not supplied."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    id: id
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "Third party with this ID does not exist."});
            return;
        } else {
            await myDataSource
                .createQueryBuilder()
                .update(TblThirdparty)
                .set({ isActive:true})
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Third party made active."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {thirdPartyactive};