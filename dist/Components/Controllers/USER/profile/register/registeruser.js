"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeruser = void 0;
const app_data_source_1 = __importDefault(require("../../../../../app-data-source"));
const Tbluser_1 = require("../../../../../ORM/entities/Tbluser");
const getCurrentTime_1 = require("../../../../utils/time/getCurrentTime");
const transporter_1 = require("../../../../utils/email/transporter");
const generateotp_1 = require("../../../../../Components/utils/otp/generateotp");
const timediff_1 = require("../../../../../Components/utils/time/timediff");
const registeruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let email = userdata === null || userdata === void 0 ? void 0 : userdata.email;
        if (!email) {
            res
                .status(400)
                .json({ "error": "Email is missing." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                username: `${email}`,
                socialflag: false
            }
        });
        if (!userData) {
            let tbluser = new Tbluser_1.Tbluser();
            tbluser.username = email;
            tbluser.socialflag = false;
            tbluser.email = email;
            tbluser.activeStatus = false;
            tbluser.registrationStatus = "STARTED";
            let currentTime = yield (0, getCurrentTime_1.getCurrentTime)();
            tbluser.registrationDatetime = new Date(currentTime);
            let otp;
            try {
                otp = yield (0, generateotp_1.generateOTP)();
                tbluser.otp = otp;
                tbluser.otpFailAttempts = 0;
                let otpgentime = yield (0, getCurrentTime_1.getCurrentTime)();
                tbluser.otpGeneratedDatetime = new Date(otpgentime);
                tbluser.otpStep = "SENT";
            }
            catch (error) {
                res
                    .status(400)
                    .json({ "error": "Error while generating OTP." });
                return;
            }
            ;
            try {
                let transporter = yield (0, transporter_1.createTransporter)();
                var mailOptions = {
                    from: process.env.EMAIL_sender,
                    to: email,
                    subject: `OTP for ${process.env.APP_NAME}`,
                    text: `Your otp is --> ${otp}`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            res
                                .status(400)
                                .json({ detail: "Error occured while sending OTP.", error: error });
                            return;
                        }
                        else {
                            transporter.close();
                            let a = yield app_data_source_1.default
                                .manager
                                .save(tbluser);
                            let userid = a === null || a === void 0 ? void 0 : a.id;
                            res
                                .status(200)
                                .json({ success: "User has been registered. Check email for the OTP.", userid: userid });
                            return;
                        }
                        ;
                    });
                });
            }
            catch (error) {
                res
                    .status(400)
                    .json({ detail: "Error occured while sending OTP.", error: error });
                return;
            }
            ;
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.registrationStatus) === "REGISTERED") {
            res
                .status(400)
                .json({ detail: "User has already been registered. Proceed to login." });
            return;
        }
        else {
            if (userData.registrationDatetime) {
                let registrationAttemptTime = yield (0, getCurrentTime_1.getCurrentTime)();
                registrationAttemptTime = new Date(registrationAttemptTime);
                try {
                    let result = yield (0, timediff_1.getTimeDiff)(userData.registrationDatetime, registrationAttemptTime);
                    // console.log(result,parseInt(`${process.env.REGISTRATION_otpTimeout}`));
                    if (result >= parseInt(`${process.env.REGISTRATION_otpTimeout}`)) {
                        // console.log(result>=parseInt(`${process.env.REGISTRATION_otpTimeout}`));
                        let otp;
                        try {
                            otp = yield (0, generateotp_1.generateOTP)();
                            // let otpFailAttempts =userData.otpFailAttempts+1;
                            let otpgentime = yield (0, getCurrentTime_1.getCurrentTime)();
                            let otpGeneratedDatetime = new Date(otpgentime);
                            let otpStep = "SENT";
                            try {
                                let transporter = yield (0, transporter_1.createTransporter)();
                                var mailOptions = {
                                    from: process.env.EMAIL_sender,
                                    to: email,
                                    subject: `OTP for ${process.env.APP_NAME}`,
                                    text: `Your otp is --> ${otp}`
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (error) {
                                            res
                                                .status(400)
                                                .json({ detail: "Error occured while sending OTP.", error: error });
                                            return;
                                        }
                                        else {
                                            transporter.close();
                                            let userid = userData === null || userData === void 0 ? void 0 : userData.id;
                                            let currentTime = yield (0, getCurrentTime_1.getCurrentTime)();
                                            let registrationDatetime = new Date(currentTime);
                                            yield app_data_source_1.default
                                                .createQueryBuilder()
                                                .update(Tbluser_1.Tbluser)
                                                .set({ registrationDatetime: registrationDatetime, otpStep: otpStep, otp: otp, otpGeneratedDatetime: otpGeneratedDatetime })
                                                .where("id = :id", { id: userid })
                                                .execute();
                                            res
                                                .status(200)
                                                .json({ success: "Check email for the OTP.", userid: userid });
                                            return;
                                        }
                                    });
                                });
                            }
                            catch (error) {
                                res
                                    .status(400)
                                    .json({ detail: "Error occured while sending OTP.", error: error });
                                return;
                            }
                            ;
                        }
                        catch (error) {
                            res
                                .status(400)
                                .json({ "error": "Error while generating OTP." });
                            return;
                        }
                        ;
                    }
                    else if (result < parseInt(`${process.env.REGISTRATION_otpTimeout}`)) {
                        let registrationtime = userData.registrationDatetime;
                        let timeouttime = yield (0, timediff_1.getTimeAfterTimeout)(registrationtime);
                        res
                            .status(400)
                            .json({ "error": `Too many registration attempts. You have been timed out until ${timeouttime}.` });
                        return;
                    }
                    ;
                }
                catch (error) {
                    res
                        .status(400)
                        .json({ detail: `${error}` });
                    return;
                }
                ;
            }
            else {
                res
                    .status(400)
                    .json({ detail: "User has already been registered, but account verification is incomplete." });
                return;
            }
            ;
        }
        ;
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.registeruser = registeruser;
