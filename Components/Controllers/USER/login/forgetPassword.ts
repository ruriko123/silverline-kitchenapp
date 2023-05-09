import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {getCurrentTime} from "@utils/time/getCurrentTime";
import {createTransporter} from "@utils/email/transporter";
import {generateOTP} from "@base/Components/utils/otp/generateotp";

const forgetPassword : RequestHandler = async(req, res) => {
    try {
        let userEmail : string = req
            ?.body
                ?.email;
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    email:userEmail,
                    registrationStatus:"REGISTERED",
                    socialflag:false
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User does not exist."});
            return;
        };


            let otp : string = await generateOTP();
            let otpgentime = await getCurrentTime();
            let otpGeneratedDatetime = new Date(otpgentime);
            try {
                let transporter = await createTransporter();
                var mailOptions = {
                    from: process.env.EMAIL_sender,
                    to: `${userData?.email}`,
                    subject: `Forgot password OTP for ${process.env.APP_NAME}`,
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
                            .set({forgotPasswordotp: otp, forgotPasswordotpGeneratedDatetime: otpGeneratedDatetime})
                            .where("id = :id", {id: userid})
                            .execute();
                        res
                            .status(200)
                            .json({success: "Check email for the OTP.", userid: userid,otp:otp});
                        return;
                    };
                });
            } catch (error) {
                res
                    .status(400)
                    .json({detail: "Error occured while sending OTP.", error: error});
                return;
            };
    
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {forgetPassword};
