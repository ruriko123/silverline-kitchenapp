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
exports.forgetPassword = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const getCurrentTime_1 = require("../../../utils/time/getCurrentTime");
const transporter_1 = require("../../../utils/email/transporter");
const generateotp_1 = require("../../../../Components/utils/otp/generateotp");
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userEmail = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                email: userEmail,
                registrationStatus: "REGISTERED",
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
        let otp = yield (0, generateotp_1.generateOTP)();
        let otpgentime = yield (0, getCurrentTime_1.getCurrentTime)();
        let otpGeneratedDatetime = new Date(otpgentime);
        try {
            let transporter = yield (0, transporter_1.createTransporter)();
            var mailOptions = {
                from: process.env.EMAIL_sender,
                to: `${userData === null || userData === void 0 ? void 0 : userData.email}`,
                subject: `Forgot password OTP for ${process.env.APP_NAME}`,
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
                            .set({ forgotPasswordotp: otp, forgotPasswordotpGeneratedDatetime: otpGeneratedDatetime })
                            .where("id = :id", { id: userid })
                            .execute();
                        res
                            .status(200)
                            .json({ success: "Check email for the OTP.", userid: userid, otp: otp });
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
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
    ;
});
exports.forgetPassword = forgetPassword;
