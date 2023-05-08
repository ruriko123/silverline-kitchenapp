import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {getCurrentTime} from "@utils/time/getCurrentTime";
import {createTransporter} from "@utils/email/transporter";
import {generateOTP} from "@base/Components/utils/otp/generateotp";
import {getTimeDiff, resendgetTimeAfterTimeout} from "@base/Components/utils/time/timediff";

const resendotp : RequestHandler = async(req, res) => {
    try {
        let userid : number = req
            ?.body
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
                .json({detail: "User has not been registered properly. Register the user once again"});
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

        // TIMEOUT THE PERSON IF RESEND OTP HAS BEEN USED MORE THAN
        // process.env.OTP_RESEND_TIMEOUT_START_ATTEMPTS TIMES.
        if ((!(userData
            ?.otpFailAttempts) || userData
            ?.otpFailAttempts >= parseInt(`${process.env.OTP_RESEND_TIMEOUT_START_ATTEMPTS}`)) && result < parseInt(`${process.env.OTP_RESEND_TIMEOUT}`)) {
            let timeouttime = await resendgetTimeAfterTimeout(userData.otpGeneratedDatetime);
            res
                .status(400)
                .json({"error": `Too many otp generation attempts. You have been timed out until ${timeouttime}.`});
            return;
        } else {
            let otp : string = await generateOTP();
            let otpgentime = await getCurrentTime();
            let otpGeneratedDatetime = new Date(otpgentime);
            let otpStep = "SENT";
            try {
                let transporter = await createTransporter();
                var mailOptions = {
                    from: process.env.EMAIL_sender,
                    to: `${userData.email}`,
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
                        let userid = userData
                            ?.id;
                        await myDataSource
                            .createQueryBuilder()
                            .update(Tbluser)
                            .set({otpStep: otpStep, otp: otp, otpGeneratedDatetime: otpGeneratedDatetime})
                            .where("id = :id", {id: userid})
                            .execute();
                        res
                            .status(200)
                            .json({success: "Check email for the OTP.", userid: userid});
                        return;
                    };
                });
            } catch (error) {
                res
                    .status(400)
                    .json({detail: "Error occured while sending OTP.", error: error});
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

export {resendotp};
