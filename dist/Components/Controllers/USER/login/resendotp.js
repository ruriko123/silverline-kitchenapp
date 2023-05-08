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
exports.resendotp = void 0;
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const Tbluser_1 = require("@model/Tbluser");
const getCurrentTime_1 = require("@utils/time/getCurrentTime");
const transporter_1 = require("@utils/email/transporter");
const generateotp_1 = require("@base/Components/utils/otp/generateotp");
const timediff_1 = require("@base/Components/utils/time/timediff");
const resendotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userid = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                id: userid,
                socialflag: false
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ detail: "User does not exist." });
            return;
        }
        ;
        if ((userData === null || userData === void 0 ? void 0 : userData.activeStatus) === false) {
            res
                .status(400)
                .json({ detail: "User is blocked." });
            return;
        }
        ;
        if ((userData === null || userData === void 0 ? void 0 : userData.registrationStatus) === "REGISTERED") {
            res
                .status(400)
                .json({ detail: "User has already been registered. Process to login." });
            return;
        }
        ;
        if (!((userData === null || userData === void 0 ? void 0 : userData.otpStep) === "SENT")) {
            res
                .status(400)
                .json({ detail: "User has not been registered properly. Register the user once again" });
            return;
        }
        ;
        if (!(userData.otpGeneratedDatetime)) {
            res
                .status(400)
                .json({ detail: "OTP generation time for the user not found. Regenerate the OTP." });
            return;
        }
        ;
        let otpLoginAttemptTime = yield (0, getCurrentTime_1.getCurrentTime)();
        otpLoginAttemptTime = new Date(otpLoginAttemptTime);
        let result = yield (0, timediff_1.getTimeDiff)(userData.otpGeneratedDatetime, otpLoginAttemptTime);
        // TIMEOUT THE PERSON IF RESEND OTP HAS BEEN USED MORE THAN
        // process.env.OTP_RESEND_TIMEOUT_START_ATTEMPTS TIMES.
        if ((userData === null || userData === void 0 ? void 0 : userData.resendOtpAttempts) >= parseInt(`${process.env.OTP_RESEND_TIMEOUT_START_ATTEMPTS}`) && result < parseInt(`${process.env.OTP_RESEND_TIMEOUT}`)) {
            let timeouttime = yield (0, timediff_1.resendgetTimeAfterTimeout)(userData.otpGeneratedDatetime);
            res
                .status(400)
                .json({ "error": `Too many otp generation attempts. You have been timed out until ${timeouttime}.` });
            return;
        }
        else {
            let otp = yield (0, generateotp_1.generateOTP)();
            let otpgentime = yield (0, getCurrentTime_1.getCurrentTime)();
            let otpGeneratedDatetime = new Date(otpgentime);
            let otpStep = "SENT";
            try {
                let transporter = yield (0, transporter_1.createTransporter)();
                var mailOptions = {
                    from: process.env.EMAIL_sender,
                    to: `${userData.email}`,
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
                            let resendOtpAttempts = ((userData === null || userData === void 0 ? void 0 : userData.resendOtpAttempts) || 0) + 1;
                            yield app_data_source_1.default
                                .createQueryBuilder()
                                .update(Tbluser_1.Tbluser)
                                .set({ resendOtpAttempts: resendOtpAttempts, otpStep: otpStep, otp: otp, otpGeneratedDatetime: otpGeneratedDatetime })
                                .where("id = :id", { id: userid })
                                .execute();
                            res
                                .status(200)
                                .json({ success: "Check email for the OTP.", userid: userid });
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
exports.resendotp = resendotp;
