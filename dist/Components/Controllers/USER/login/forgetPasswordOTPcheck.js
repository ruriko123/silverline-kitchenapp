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
exports.forgetPasswordOTPcheck = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const forgetPasswordOTPcheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let userid = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        let userForgetPasswordOtp = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.otp;
        if (!userid) { }
        ;
        if (!userForgetPasswordOtp || userForgetPasswordOtp.length !== parseInt(`${process.env.OTP_LENGTH}`)) {
            res
                .status(400)
                .json({ detail: "Invalid otp supplied." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
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
                .json({ detail: "User does not exist." });
            return;
        }
        ;
        if (!(userData === null || userData === void 0 ? void 0 : userData.forgotPasswordotp)) {
            res
                .status(400)
                .json({ detail: "Not allowed. Use forget password before using this service." });
            return;
        }
        try {
            if ((userData === null || userData === void 0 ? void 0 : userData.forgotPasswordotp) === userForgetPasswordOtp) {
                res
                    .status(200)
                    .json({ success: "Proceed ahead and create new password" });
                return;
            }
            ;
            if (!((userData === null || userData === void 0 ? void 0 : userData.forgotPasswordotp) === userForgetPasswordOtp)) {
                res
                    .status(400)
                    .json({ detail: "Forget password OTP does not match." });
                return;
            }
            ;
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
            .json({ detail: error });
        return;
    }
    ;
});
exports.forgetPasswordOTPcheck = forgetPasswordOTPcheck;
