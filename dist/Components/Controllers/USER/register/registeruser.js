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
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const userPassword_1 = require("../../../utils/USER/normalLogin/userPassword");
const getCurrentTime_1 = require("../../../utils/time/getCurrentTime");
const transporter_1 = require("../../../utils/email/transporter");
const generateotp_1 = require("../../../../Components/utils/otp/generateotp");
const timediff_1 = require("../../../../Components/utils/time/timediff");
const registeruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let password = userdata === null || userdata === void 0 ? void 0 : userdata.password;
        let full_name = userdata === null || userdata === void 0 ? void 0 : userdata.full_name;
        let email = userdata === null || userdata === void 0 ? void 0 : userdata.email;
        let phone = (userdata === null || userdata === void 0 ? void 0 : userdata.phone) || "";
        let long = (userdata === null || userdata === void 0 ? void 0 : userdata.long) || "";
        let lat = (userdata === null || userdata === void 0 ? void 0 : userdata.lat) || "";
        if (!long || long === "") {
            long = "85.3240";
        }
        ;
        if (!lat || lat === "") {
            lat = "27.7172";
        }
        ;
        let address = (userdata === null || userdata === void 0 ? void 0 : userdata.address) || "";
        let deviceid = (userdata === null || userdata === void 0 ? void 0 : userdata.deviceid) || "";
        let devicetype = (userdata === null || userdata === void 0 ? void 0 : userdata.devicetype) || "";
        let firebasetoken = (userdata === null || userdata === void 0 ? void 0 : userdata.firebasetoken) || "";
        if (!password) {
            res
                .status(400)
                .json({ "error": "Password is missing." });
            return;
        }
        ;
        if (!full_name) {
            res
                .status(400)
                .json({ "error": "Full name is missing." });
            return;
        }
        ;
        if (!email) {
            res
                .status(400)
                .json({ "error": "Email is missing." });
            return;
        }
        ;
        password = (yield (0, userPassword_1.userPasswordToken)(password)) || "";
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                username: `${email}`,
                password: `${password}`
            }
        });
        if (!userData) {
            let tbluser = new Tbluser_1.Tbluser();
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
                    });
                });
            }
            catch (error) {
                res
                    .status(400)
                    .json({ detail: "Error occured while sending OTP.", error: error });
                return;
            }
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
                    console.log(result);
                    if (result >= parseInt(`${process.env.REGISTRATION_otpTimeout}`)) {
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
                                            yield app_data_source_1.default
                                                .createQueryBuilder()
                                                .update(Tbluser_1.Tbluser)
                                                .set({ otpStep: otpStep, otp: otp, otpGeneratedDatetime: otpGeneratedDatetime })
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
                    else {
                        let registrationtime = userData.registrationDatetime;
                        let timeouttime = yield (0, timediff_1.getTimeAfterTimeout)(registrationtime);
                        res
                            .status(400)
                            .json({ "error": `Too many registration attempts. You have been timedout until ${timeouttime}.` });
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
            ;
            res
                .status(400)
                .json({ detail: "User has already been registered, but account verification is incomplete." });
            return;
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
