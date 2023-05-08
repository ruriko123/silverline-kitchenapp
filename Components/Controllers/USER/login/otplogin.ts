import {RequestHandler} from "express";
import {otpLogin} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {generateToken} from "@utils/USER/token";
import {userPasswordToken} from "@utils/USER/normalLogin/userPassword";
import {getCurrentTime} from "@utils/time/getCurrentTime";
import {createTransporter} from "@utils/email/transporter";
import {generateOTP} from "@base/Components/utils/otp/generateotp";
import {getTimeDiff, getTimeAfterTimeout} from "@base/Components/utils/time/timediff";

const otplogin : RequestHandler = async(req, res) => {
    try {
        let userdata : otpLogin = req
            ?.body;
        let otp = userdata
            ?.otp;
        let userid = userdata
            ?.id;
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
        if (userData
            ?.activeStatus === false) {
            res
                .status(400)
                .json({detail: "User is blocked."});
            return;
        };
        if (userData
            ?.registrationStatus === "REGISTERED") {
            res
                .status(400)
                .json({detail: "User has already been registered. Process to login."});
            return;
        };
        if (!(userData
            ?.otpStep === "SENT")) {
            res
                .status(400)
                .json({
                    detail: "OTP has not been generated for the user. Register the user once again or resend " +
                            "the otp."
                });
            return;
        };
        if (!(userData.otpGeneratedDatetime)) {
            res
                .status(400)
                .json({detail: "OTP generation time for the user not found. Regenerate the OTP."});
            return;
        };
        let otpLoginAttemptTime : string | Date = await getCurrentTime();
        otpLoginAttemptTime = new Date(otpLoginAttemptTime);
        let result = await getTimeDiff(userData.otpGeneratedDatetime, otpLoginAttemptTime);
        if (result > parseInt(`${process.env.OTP_EXPIRETIME}`)) {
            res
                .status(400)
                .json({detail: "OTP has expired."});
            return;
        };
        if (!(userData
            ?.otp === otp)) {
            let otpFailAttempts = userData
                ?.otpFailAttempts + 1;
            await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({otpFailAttempts: otpFailAttempts})
                .where("id = :id", {id: userid})
                .execute();
            res
                .status(400)
                .json({detail: "OTP does not match."});
            return;
        };
        if (userData
            ?.otp === otp) {
            let otpFailAttempts = 0;
            let registrationStatus = "REGISTERED";
            let emailverificationStatus = true;
            let otpStep = "COMPLETED";
            await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({otpStep: otpStep, emailverificationStatus: emailverificationStatus, registrationStatus: registrationStatus, otpFailAttempts: otpFailAttempts})
                .where("id = :id", {id: userid})
                .execute();
            let full_name = userData
                ?.displayname;
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
                        message: "User verified.",
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

export {otplogin};
