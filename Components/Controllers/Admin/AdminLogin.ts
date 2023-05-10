import {adminHash, adminHashCompare} from "@base/Components/utils/AdminHash";
import {RequestHandler} from "express";
import {TblAdmin} from "@model/TblAdmin";
import myDataSource from "@base/app-data-source";

const adminLogin : RequestHandler = async(req, res) => {
    try {
        let userName = req.body
            ?.username;
        let password = req.body
            ?.password;
        password = encodeURIComponent(password);
        let adminActiveCheck = await myDataSource
        .getRepository(TblAdmin)
        .findOne({
            where: {
                isActive: true,
                userName: `${userName}`
            }
        });
        if(!adminActiveCheck){
            res
            .status(401)
            .json({"error": "Inactive Admin."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblAdmin)
            .findOne({
                where: {
                    userName: `${userName}`
                }
            });
        if (!userData || !(userData
            ?.Password) || userData
            ?.Password === "") {
            res
                .status(401)
                .json({"error": "Invalid credentials"});
                return;
        } else {
            let checkDB = await adminHashCompare(password, userData.Password || "");
            if (checkDB) {
                req.session.admin = true;
                req.session.adminName=userName;
                res
                    .status(200)
                    .json({username:userName,password:password});
                    return;
            } else {
                res
                    .status(401)
                    .json({"error": "Invalid credentials"});
                    return;
            };
        };
    } catch (error) {
        res
            .status(500)
            .json({error: error});
            return;
    };
};

export {adminLogin};