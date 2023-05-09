import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {userPasswordToken} from "@utils/USER/normalLogin/userPassword";
import {generateToken} from "@utils/USER/token";


const forgetPasswordChange : RequestHandler = async(req, res) => {
    try {

        let userid : number = req
            ?.body
                ?.id;
        let userForgetPasswordOtp:string = req
            ?.body
                ?.otp;
        let userpassword:string = req?.body?.password;
        if(!userForgetPasswordOtp){
            res
            .status(400)
            .json({detail: "OTP not supplied."});
        return;
        };

        if(userForgetPasswordOtp.length!== parseInt(`${process.env.OTP_LENGTH}`)){
            res
                .status(400)
                .json({detail: "Invalid otp supplied."});
            return;
        };
        if(!userpassword){
            res
            .status(400)
            .json({detail: "New password not supplied."});
        return;
        };
        if(!(userpassword.length>=8 && userpassword.length<=15)){
            res
            .status(400)
            .json({detail: "Password must be between 8 to 15 characters in length."});
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

            if (userData
                ?.forgotPasswordotp === userForgetPasswordOtp) {
                let password = await userPasswordToken(userpassword) || "";
                await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({forgotPasswordotp: "", password:password})
                .where("id = :id", {id: userid})
                .execute();

            let tokenobject = {
                id: userData
                    ?.id,
                displayname: userData
                ?.displayname
            };
            let token = await generateToken(tokenobject);
            res
                .status(200)
                .json({
                    success: {
                        message: "Password changed.",
                        token: token
                    }
                });
            return;

            };
            if (!(userData
                ?.forgotPasswordotp === userForgetPasswordOtp)) {
                res
                    .status(400)
                    .json({detail: "OTP does not match."});
                return;
            };

    } catch (error) {
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {forgetPasswordChange};
