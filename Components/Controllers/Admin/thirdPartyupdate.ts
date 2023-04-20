

import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";

const thirdPartyupdate : RequestHandler = async(req, res) => {

    try {
        let id:number=req.body?.id;
        let Name : string = req.body
            ?.Name;
        let Address : string = req.body
            ?.Address;
        let Phone : string = req.body
            ?.Phone;
        let Pan : string = req.body
            ?.Pan;
        let AltPhone : string = req.body
            ?.AltPhone || "";
        let Email : string = req.body
            ?.Email;
        let addedBy : string = req.session
            ?.adminName || "";
        let baseURL:string=req.body?.baseURL;

        if (!Name || !Address || !Phone || !Pan || !AltPhone || !Email||!baseURL) {
            res
                .status(401)
                .json({"error": "Missing parameters."});
            return;
        }
        let userData = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    CompanyName: `${Name}`
                }
            });
        if (userData) {
            res
                .status(400)
                .json({"error": "Company name already registered. Try with another name."});
            return;
        } else {

                await myDataSource
                .createQueryBuilder()
                .update(TblThirdparty)
                .set({ Name:Name,Email:Email,Phone:Phone,AltPhone:AltPhone,Pan:Pan,addedBy:addedBy,Address:Address,baseURL:baseURL})
                .where("id = :id", {id: id})
                .execute();

            res
                .status(200)
                .json({"success": "Third party updated successfully."});
            return;
        }

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;

    }

};

export {thirdPartyupdate};