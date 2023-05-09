import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';

const changerUserPfp : RequestHandler = async(req, res) => {

    try {
        let token = req
            ?.headers
                ?.token;

        if (!token) {
            res
                .status(303)
                .json({detail: "Missing parameters."});
            return;
        };

        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(303)
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
        if(!(userData?.activeStatus)){
            res
            .status(400)
            .json({detail: "User is blocked."});
        return;
        };
        if(!(userData?.registrationStatus==="REGISTERED")){
            res
                .status(400)
                .json({detail: "User not registered."});
            return;
        };

        if (!req.file || Object.keys(req.file).length === 0) {
            res
                .status(400)
                .send('No files were uploaded.');
            return;
        };

        let filepath = `/uploads/${req.file.filename}`;
        var fullUrl = req.protocol + '://' + req.get('host') + filepath;

        await myDataSource
            .createQueryBuilder()
            .update(Tbluser)
            .set({profilepicture:fullUrl})
            .where("id = :id", {id: userid})
            .execute();
        let responsejson = {
            id:userData?.id,
            displayname:userData?.displayname,
            email:userData?.email,
            phone:userData?.phone,
            altphone:userData?.altphone,
            points:userData?.points,
            locationName:userData?.locationName,
            profilepicture:fullUrl,
        };


        
        res
            .status(200)
            .json(responsejson);
        return;

    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {changerUserPfp};