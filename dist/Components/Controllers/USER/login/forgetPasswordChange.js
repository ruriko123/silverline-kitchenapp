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
exports.forgetPasswordChange = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const userPassword_1 = require("../../../utils/USER/normalLogin/userPassword");
const token_1 = require("../../../utils/USER/token");
const forgetPasswordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let userid = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
        let userForgetPasswordOtp = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.otp;
        let userpassword = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.password;
        if (!userForgetPasswordOtp) {
            res
                .status(400)
                .json({ detail: "OTP not supplied." });
            return;
        }
        ;
        if (userForgetPasswordOtp.length !== parseInt(`${process.env.OTP_LENGTH}`)) {
            res
                .status(400)
                .json({ detail: "Invalid otp supplied." });
            return;
        }
        ;
        if (!userpassword) {
            res
                .status(400)
                .json({ detail: "New password not supplied." });
            return;
        }
        ;
        if (!(userpassword.length >= 8 && userpassword.length <= 15)) {
            res
                .status(400)
                .json({ detail: "Password must be between 8 to 15 characters in length." });
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
        if ((userData === null || userData === void 0 ? void 0 : userData.forgotPasswordotp) === userForgetPasswordOtp) {
            let password = (yield (0, userPassword_1.userPasswordToken)(userpassword)) || "";
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(Tbluser_1.Tbluser)
                .set({ forgotPasswordotp: "", password: password })
                .where("id = :id", { id: userid })
                .execute();
            let tokenobject = {
                id: userData === null || userData === void 0 ? void 0 : userData.id,
                displayname: userData === null || userData === void 0 ? void 0 : userData.displayname
            };
            let token = yield (0, token_1.generateToken)(tokenobject);
            res
                .status(200)
                .json({
                success: {
                    message: "Password changed.",
                    token: token
                }
            });
            return;
        }
        ;
        if (!((userData === null || userData === void 0 ? void 0 : userData.forgotPasswordotp) === userForgetPasswordOtp)) {
            res
                .status(400)
                .json({ detail: "OTP does not match." });
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
exports.forgetPasswordChange = forgetPasswordChange;
