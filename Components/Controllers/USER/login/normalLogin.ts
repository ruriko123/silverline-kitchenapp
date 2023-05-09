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
        if (!email) {
            res
                .status(400)
                .json({"detail": "Email not supplied."});
            return;
        };

        let long = userdata
            ?.long || "";
        let lat = userdata
            ?.lat || "";
        if (!long || long === "") {
            long = "85.3240";
        };
        if (!lat || lat === "") {
            lat = "27.7172";
        };
        let address = userdata
            ?.address || "";
        let deviceid = userdata
            ?.deviceid || "";
        let devicetype = userdata
            ?.devicetype || "";
        let firebasetoken = userdata
            ?.firebasetoken || "";
        if (!password) {
            res
                .status(400)
                .json({detail: "Password is missing."});
            return;
        };
        if (!(password.length >= 8 && password.length <= 15)) {
            res
                .status(400)
                .json({detail: "Password must be between 8 to 15 characters in length."});
            return;
        };

        password = await userPasswordToken(password) || "";
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    username: `${email}`,
                    password: `${password}`,
                    socialflag: false
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
        } else {
            let userid = userData
                ?.id;
            let full_name = userData
                ?.displayname;
            let tokenobject = {
                id: userid,
                displayname: full_name
            };

            await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({
                    firebaseToken: firebasetoken,
                    deviceType: devicetype,
                    deviceId: deviceid,
                    locationName: address,
                    lat: lat,
                    long: long,
                    socialflag: false
                })
                .where("id = :id", {id: userid})
                .execute();

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
            .json({detail: error});
        return;
    };
};

export {normalLogin};
