import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';

const customerDetails : RequestHandler = async(req, res) => {
    try {

        let token = req
            ?.headers
                ?.token;

        if (!token) {
            res
                .status(400)
                .json({detail: "Missing parameters."});
            return;
        };

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

        let userinfo = await myDataSource
            .getRepository(Tbluser)
            .createQueryBuilder("t")
            .select([
                "t.displayname",
                "t.email",
                "t.phone",
                "t.locationName",
                "t.altphone",
            ])
            .where({id: userid})
            .getOne();

        if (!userinfo) {
            res
                .status(400)
                .json({detail: "Error while fetching user info."});
            return;
        } else {
            res
                .status(200)
                .json(userinfo);
            return;
        }

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {customerDetails};