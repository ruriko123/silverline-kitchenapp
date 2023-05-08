import {RequestHandler} from "express";
import {normalLogin} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {generateToken} from "@utils/USER/token";
import {userPasswordToken} from "@utils/USER/normalLogin/userPassword";

const normalLogin : RequestHandler = async(req, res) => {
    try {
        let userdata : normalLogin = req
            ?.body;
        let email = userdata
            ?.email;
        let password = userdata
            ?.password;
        if (!email || !password) {
            res
                .status(500)
                .json({"detail": "Email or password not supplied."});
            return;
        };

        password = await userPasswordToken(password) || "";
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    username: `${email}`,
                    password: `${password}`
                }
            });

        if (!userData) {
            res
                .status(400)
                .json({"detail": "Invalid login. Check email and password."});
        };
        
        if (!(userData
            ?.registrationStatus === "REGISTERED")) {
            res
                .status(400)
                .json({"detail": "User has not completed registration."});
        };
        if (userData
            ?.activeStatus === false) {
            res
                .status(400)
                .json({"detail": "User has been blocked."});
        }
        else {
            let userid = userData
                ?.id;
            let full_name = userData
                ?.displayname;
            let tokenobject = {
                id: userid,
                displayname: full_name
            };
            let token = await generateToken(tokenobject);
            res
                .status(200)
                .json({
                    success: {
                        message: "Already exists.",
                        token: token
                    }
                });
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {normalLogin};
