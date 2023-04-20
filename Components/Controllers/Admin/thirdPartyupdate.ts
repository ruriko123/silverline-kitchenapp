import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";
import {Not} from "typeorm";

const thirdPartyupdate : RequestHandler = async(req, res) => {

    try {
        let id : number = req.body
            ?.id;
        let Name : string = req.body
            ?.Name;

        // let Address : string = req.body     ?.Address; let Phone : string = req.body
        //    ?.Phone; let Pan : string = req.body     ?.Pan; let AltPhone : string =
        // req.body     ?.AltPhone || ""; let Email : string = req.body     ?.Email; let
        // addedBy : string = req.session     ?.adminName || ""; let
        // baseURL:string=req.body?.baseURL;

        if (!id || !Name) {
            res
                .status(401)
                .json({"error": "Company ID or name not supplied."});
            return;
        }
        req.body["CompanyName"] = Name;

        delete req.body["id"];
        let userData = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    CompanyName: `${req.body["Name"]}`,
                    id: Not(id)
                }
            });
        if (userData) {
            res
                .status(400)
                .json({"error": "Company name already registered. Try with another name."});
            return;
        } else {

            delete req.body["Name"];
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
        }

    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({"error": error});
        return;

    }

};

export {thirdPartyupdate};