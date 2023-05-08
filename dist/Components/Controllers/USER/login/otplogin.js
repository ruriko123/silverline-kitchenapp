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
exports.otplogin = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const token_1 = require("../../../utils/USER/token");
const getCurrentTime_1 = require("../../../utils/time/getCurrentTime");
const timediff_1 = require("../../../../Components/utils/time/timediff");
const otplogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let otp = userdata === null || userdata === void 0 ? void 0 : userdata.otp;
        let userid = userdata === null || userdata === void 0 ? void 0 : userdata.id;
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
                .json({
                detail: "OTP has not been generated for the user. Register the user once again or resend " +
                    "the otp."
            });
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
        if (result > parseInt(`${process.env.OTP_EXPIRETIME}`)) {
            res
                .status(400)
                .json({ detail: "OTP has expired." });
            return;
        }
        ;
        if (!((userData === null || userData === void 0 ? void 0 : userData.otp) === otp)) {
            let otpFailAttempts = (userData === null || userData === void 0 ? void 0 : userData.otpFailAttempts) + 1;
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(Tbluser_1.Tbluser)
                .set({ otpFailAttempts: otpFailAttempts })
                .where("id = :id", { id: userid })
                .execute();
            res
                .status(400)
                .json({ detail: "OTP does not match." });
            return;
        }
        ;
        if ((userData === null || userData === void 0 ? void 0 : userData.otp) === otp) {
            let otpFailAttempts = 0;
            let emailverificationStatus = true;
            let otpStep = "COMPLETED";
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(Tbluser_1.Tbluser)
                .set({ activeStatus: true, otpStep: otpStep, emailverificationStatus: emailverificationStatus, otpFailAttempts: otpFailAttempts })
                .where("id = :id", { id: userid })
                .execute();
            let full_name = userData === null || userData === void 0 ? void 0 : userData.displayname;
            let tokenobject = {
                id: userData === null || userData === void 0 ? void 0 : userData.id,
                displayname: full_name
            };
            let token = yield (0, token_1.generateToken)(tokenobject);
            res
                .status(200)
                .json({
                success: {
                    message: "User verified.",
                    token: token
                }
            });
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
exports.otplogin = otplogin;
