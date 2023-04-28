import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import {TbloperatingLocations} from "@model/TbloperatingLocations";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';

interface preferredLocation {
    token : string,
    location_id : number;
};

const saveUserPreferredLocation : RequestHandler = async(req, res) => {
    try {
        let userdata : preferredLocation = req
            ?.body;
        let token = req?.headers?.token;
        let userpreferredlocation = userdata
            ?.location_id;
        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(400)
                .json({detail: "error while reading token."});
            return;
        };
        let userid : number = tokendata
            ?.id;
        let userdisplayname : string = tokendata
            ?.displayname;
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    displayname: `${userdisplayname}`
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User not found."});
            return;
        };
        let locationData = await myDataSource
            .getRepository(TbloperatingLocations)
            .findOne({
                where: {
                    id: userpreferredlocation
                }
            });
        if (!locationData) {
            res
                .status(400)
                .json({detail: "Wrong preferred loation ID supplied."});
            return;
        }
        let user = new Tbluser();
        user.preferredlocation = locationData.LocationName;
        await myDataSource
            .createQueryBuilder()
            .update(Tbluser)
            .set({preferredlocation: locationData.LocationName})
            .where("id = :id", {id: userid})
            .execute();
        res
            .status(200)
            .json({success: "User's preferred location saved."});
        return;
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;

    };

};

export {saveUserPreferredLocation};