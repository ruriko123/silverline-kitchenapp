import {RequestHandler} from "express";
import {normalUserRegister} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {generateToken} from "@utils/USER/token";
import {userPasswordToken} from "@utils/USER/normalLogin/userPassword";
import {getCurrentTime} from "@utils/time/getCurrentTime";
import {createTransporter} from "@utils/email/transporter";
import {generateOTP} from "@base/Components/utils/otp/generateotp";
import {getTimeDiff,getTimeAfterTimeout} from "@base/Components/utils/time/timediff";
var toonavatar = require('cartoon-avatar');


const registeruser : RequestHandler = async(req, res) => {
    try {
        let userdata : normalUserRegister = req
            ?.body;
        let password = userdata
            ?.password;
        let full_name = userdata
            ?.full_name;
        let email = userdata
            ?.email;
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
        if (!full_name) {
            res
                .status(400)
                .json({"error": "Full name is missing."});
            return;
        };
        if (!email) {
            res
                .status(400)
                .json({"error": "Email is missing."});
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
            var url = await toonavatar.generate_avatar();
            let tbluser = new Tbluser();
            tbluser.username = email;
            tbluser.displayname = full_name;
            tbluser.password = password;
            tbluser.socialflag = false;
            tbluser.email = email;
            tbluser.phone = phone;
            tbluser.long = long;
            tbluser.lat = lat;
            tbluser.locationName = address;
            tbluser.deviceId = deviceid;
            tbluser.deviceType = devicetype;
            tbluser.firebaseToken = firebasetoken;
            tbluser.activeStatus = false;
            tbluser.registrationStatus = "STARTED";
            tbluser.profilepicture = url;
            let currentTime = await getCurrentTime();
            tbluser.registrationDatetime = new Date(currentTime);
            let otp;
            try {
                otp = await generateOTP();
                tbluser.otp = otp;
                tbluser.otpFailAttempts = 0;
                let otpgentime = await getCurrentTime();
                tbluser.otpGeneratedDatetime = new Date(otpgentime);
                tbluser.otpStep = "SENT";
            } catch (error) {
                res
                    .status(400)
                    .json({"error": "Error while generating OTP."});
                return;
            };
            try {
                let transporter = await createTransporter();
                var mailOptions = {
                    from: process.env.EMAIL_sender,
                    to: email,
                    subject: `OTP for ${process.env.APP_NAME}`,
                    text: `Your otp is --> ${otp}`
                };
                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        res
                            .status(400)
                            .json({detail: "Error occured while sending OTP.", error: error});
                        return;
                    } else {
                        transporter.close();
                        let a = await myDataSource
                            .manager
                            .save(tbluser);
                        let userid = a
                            ?.id;
                        res
                            .status(200)
                            .json({success: "User has been registered. Check email for the OTP.", userid: userid});
                        return;
                    };
                });
            } catch (error) {
                res
                    .status(400)
                    .json({detail: "Error occured while sending OTP.", error: error});
                return;
            };
        } else if (userData
            ?.registrationStatus === "REGISTERED") {
            res
                .status(400)
                .json({detail: "User has already been registered. Proceed to login."});
            return;
        } else {
            if (userData.registrationDatetime){
                let registrationAttemptTime : string | Date = await getCurrentTime();
                registrationAttemptTime = new Date(registrationAttemptTime);
                try {
                    let result = await getTimeDiff(userData.registrationDatetime, registrationAttemptTime);
                    // console.log(result,parseInt(`${process.env.REGISTRATION_otpTimeout}`));
                    if (result >= parseInt(`${process.env.REGISTRATION_otpTimeout}`)) {
                        // console.log(result>=parseInt(`${process.env.REGISTRATION_otpTimeout}`));
                        let otp:string;
                        try {
                            otp = await generateOTP();
                            // let otpFailAttempts =userData.otpFailAttempts+1;
                            let otpgentime = await getCurrentTime();
                            let otpGeneratedDatetime = new Date(otpgentime);
                            let otpStep = "SENT";
                            try {
                                let transporter = await createTransporter();
                                var mailOptions = {
                                    from: process.env.EMAIL_sender,
                                    to: email,
                                    subject: `OTP for ${process.env.APP_NAME}`,
                                    text: `Your otp is --> ${otp}`
                                };
                                transporter.sendMail(mailOptions, async function (error, info) {
                                    if (error) {
                                        res
                                            .status(400)
                                            .json({detail: "Error occured while sending OTP.", error: error});
                                        return;
                                    } else {
                                        transporter.close();
                                        let userid = userData?.id;
                                        let currentTime = await getCurrentTime();
                                        let registrationDatetime = new Date(currentTime);
                                        await myDataSource
                                        .createQueryBuilder()
                                            .update(Tbluser)
                                            .set({ registrationDatetime:registrationDatetime,otpStep:otpStep,otp:otp,otpGeneratedDatetime:otpGeneratedDatetime})
                                            .where("id = :id", {id: userid})
                                            .execute();
                                        res
                                            .status(200)
                                            .json({success: "Check email for the OTP.", userid: userid});
                                        return;
                                    }
                                });
                            } catch (error) {
                                res
                                    .status(400)
                                    .json({detail: "Error occured while sending OTP.", error: error});
                                return;
                            };
                        } catch (error) {
                            res
                                .status(400)
                                .json({"error": "Error while generating OTP."});
                            return;
                        };
                    } else if (result<parseInt(`${process.env.REGISTRATION_otpTimeout}`)) {
                        let registrationtime = userData.registrationDatetime;
                        let timeouttime = await getTimeAfterTimeout(registrationtime);
                        res
                                .status(400)
                                .json({"error": `Too many registration attempts. You have been timed out until ${timeouttime}.`});
                            return;
                    };
                } catch (error) {
                    res
                        .status(400)
                        .json({detail: `${error}`});
                    return;
                };
            } else {
                res
                    .status(400)
                    .json({detail: "User has already been registered, but account verification is incomplete."});
                return;
            };
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {registeruser};
