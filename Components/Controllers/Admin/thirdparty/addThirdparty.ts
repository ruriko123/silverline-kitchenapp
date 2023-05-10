import {RequestHandler} from "express";
import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";
import {thirdPartyToken} from "@base/Components/utils/thirdPartyToken";

const addThirdParty : RequestHandler = async(req, res) => {
    try {
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
        let addedDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kathmandu'});
        if (!Name || !Address || !Phone || !Pan || !AltPhone || !Email||!baseURL) {
            res
                .status(401)
                .json({"error": "Missing parameters."});
            return;
        };
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
                .json({error: "Company name already registered. Try with another name."});
            return;
        } else {
            let Token = await thirdPartyToken();
            const thirdparty = new TblThirdparty();
            thirdparty.CompanyName = Name;
            thirdparty.Address = Address;
            thirdparty.Phone = Phone;
            thirdparty.AltPhone = AltPhone;
            thirdparty.Email = Email;
            thirdparty.addedBy = addedBy;
            thirdparty.addedDate = addedDate;
            thirdparty.Token = Token;
            thirdparty.Pan = Pan;
            thirdparty.baseURL=baseURL;
            await myDataSource
                .manager
                .save(thirdparty);
            res
                .status(200)
                .json({"success": "Third party added successfully."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {addThirdParty};