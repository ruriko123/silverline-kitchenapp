import {RequestHandler} from "express";
import {adminHash} from "@base/Components/utils/AdminHash";
import {TblAdmin} from "@model/TblAdmin";
import myDataSource from "@base/app-data-source";

const addAdmin : RequestHandler = async(req, res) => {

    try {

        let userName = req.body
            ?.username;
        let password = req.body
            ?.password;
        let PermissionType=req.body?.PermissionType

        let userData = await myDataSource
            .getRepository(TblAdmin)
            .findOne({
                where: {
                    userName: `${userName}`
                }
            });
        if(userData){
            res
            .status(400)
            .json({"error": "Admin with this username already registered."});
            return;
        } else {
            const admintable = new TblAdmin();
            password = await adminHash(password);
            admintable.userName=userName;
            admintable.Password=password;
            admintable.PermissionType=PermissionType;
            await myDataSource
            .manager
            .save(admintable);
            res
            .status(200)
            .json({"success": "Admin account created."});
            return;
        }

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
            return;

    }

};

export {addAdmin};