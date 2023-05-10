import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {decodeToken} from '@utils/USER/token';

const userlogout : RequestHandler = async(req, res) => {
    try {

        let token = req
            ?.headers
                ?.token;

        if (!token) {
            res
                .status(303)
                .json({detail: "Missing token."});
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

        await myDataSource
            .createQueryBuilder()
            .update(Tbluser)
            .set({firebaseToken: ""})
            .where("id = :id", {id: userid})
            .execute();
        res
            .status(200)
            .json({success: "User has been logged out."});
        return;
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {userlogout};
