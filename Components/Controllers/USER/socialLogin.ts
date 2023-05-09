import {RequestHandler} from "express";
import {socialLogin} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {generateToken} from "@utils/USER/token";
var toonavatar = require('cartoon-avatar');



const socialLogin : RequestHandler = async(req, res) => {
    try {
        let userdata : socialLogin = req
            ?.body;
        let social_token = userdata
            ?.social_token;
        let full_name = userdata
            ?.full_name;
        let email = userdata
            ?.email;
        let phone = userdata
            ?.phone || "";
        let long = userdata
            ?.long||"";
        let lat = userdata
            ?.lat||"";
        if(!long || long===""){
            long = "85.3240";
        };
        if(!lat||lat===""){
            lat="27.7172";
        };
        let address = userdata
            ?.address || "";
        let deviceid = userdata
            ?.deviceid || "";
        let devicetype = userdata
            ?.devicetype || "";
        let firebasetoken = userdata
            ?.firebasetoken || "";
        if (!social_token || !full_name) {
            res
                .status(400)
                .json({"error": "Missing parameters."});
                return;
        };
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    username: `${social_token}`
                }
            });
        if (!userData) {
            var url = await toonavatar.generate_avatar()
            let tbluser = new Tbluser();
            tbluser.username = social_token;
            tbluser.displayname = full_name;
            tbluser.socialflag = true;
            tbluser.email = email;
            tbluser.phone = phone;
            tbluser.long = long;
            tbluser.lat = lat;
            tbluser.locationName = address;
            tbluser.deviceId = deviceid;
            tbluser.deviceType = devicetype;
            tbluser.firebaseToken = firebasetoken;
            tbluser.profilepicture = url;
            let a = await myDataSource
                .manager
                .save(tbluser);
            let userid = a
                ?.id;
            let tokenobject = {
                id: userid,
                displayname: full_name
            };
            let token = await generateToken(tokenobject);
            if (!token) {
                res
                    .status(303)
                    .json({"detail": "Error while generating token."});
                return;
            } else {
                res
                    .status(200)
                    .json({
                        success: {
                            message: "User created.",
                            token: token
                        }
                    });
                return;
            };
        } else {
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

export {socialLogin};
