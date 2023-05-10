import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";
import {Not} from "typeorm";

const thirdPartyupdate : RequestHandler = async(req, res) => {

    try {
        let id : number = parseInt(req.body
            ?.id);
        let Name : string = req.body
            ?.CompanyName;
        if (!id || !Name) {
            res
                .status(401)
                .json({"error": "Company ID or name not supplied."});
            return;
        };
        delete req.body["id"];
        let userData = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    CompanyName: `${Name}`,
                    id: Not(id)
                }
            });
        if (userData) {
            res
                .status(400)
                .json({error: "Company name already registered. Try with another name."});
            return;
        } else {
            await myDataSource
                .createQueryBuilder()
                .update(TblThirdparty)
                .set(req.body)
                .where("id = :id", {id: id})
                .execute();
            res
                .status(200)
                .json({"success": "Third party updated successfully."});
            return;
        };
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {thirdPartyupdate};