import {RequestHandler} from "express";
import {normalUserRegister} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {userPasswordToken} from "@utils/USER/normalLogin/userPassword";
var toonavatar = require('cartoon-avatar');
import {decodeToken} from '@utils/USER/token';
import {generateToken} from "@utils/USER/token";

const userRegistrationDetails : RequestHandler = async(req, res) => {
    try {
        let userdata : normalUserRegister = req
            ?.body;
        let password = userdata
            ?.password;
        let full_name = userdata
            ?.full_name;
        let phone = userdata
            ?.phone || "";
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
                .json({"error": "Password is missing."});
            return;
        };
        if(!(password.length>=8 && password.length<=15)){
            res
            .status(400)
            .json({detail: "Password must be between 8 to 15 characters in length."});
        return;
        };
        if (!full_name) {
            res
                .status(400)
                .json({"error": "Full name is missing."});
            return;
        };

        let token = req
            ?.headers
                ?.token;
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

        password = await userPasswordToken(password) || "";
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    socialflag: false
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User does not exist."});
            return;
        };

        if (!(userData
            ?.otpStep === "COMPLETED")) {
            res
                .status(400)
                .json({detail: "OTP verification not completed."});
            return;
        } else {
            var url = await toonavatar.generate_avatar();
            await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({
                    registrationStatus: "REGISTERED",
                    profilepicture: url,
                    firebaseToken: firebasetoken,
                    deviceType: devicetype,
                    deviceId: deviceid,
                    locationName: address,
                    lat: lat,
                    long: long,
                    phone: phone,
                    socialflag: false,
                    password: password,
                    displayname: full_name
                })
                .where("id = :id", {id: userid})
                .execute();

            let tokenobject = {
                id: userData
                    ?.id,
                displayname: full_name
            };
            let token = await generateToken(tokenobject);

            res
                .status(200)
                .json({
                    success: {
                        message: "User has been registered.",
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

export {userRegistrationDetails};
