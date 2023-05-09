import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';

const forgetPasswordOTPcheck : RequestHandler = async(req, res) => {
    try {

        let userid : number = req
            ?.body
                ?.id;
        let userForgetPasswordOtp = req
            ?.body
                ?.otp;
        if (!userid) {};

        if (!userForgetPasswordOtp || userForgetPasswordOtp.length !== parseInt(`${process.env.OTP_LENGTH}`)) {
            res
                .status(400)
                .json({detail: "Invalid otp supplied."});
            return;
        };

        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    registrationStatus: "REGISTERED",
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
            ?.forgotPasswordotp)) {
            res
                .status(400)
                .json({detail: "Not allowed. Use forget password before using this service."});
            return;
        }

        try {
            if (userData
                ?.forgotPasswordotp === userForgetPasswordOtp) {
                res
                    .status(200)
                    .json({success: "Proceed ahead and create new password"});
                return;
            };
            if (!(userData
                ?.forgotPasswordotp === userForgetPasswordOtp)) {
                res
                    .status(400)
                    .json({detail: "Forget password OTP does not match."});
                return;
            };
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

export {forgetPasswordOTPcheck};
