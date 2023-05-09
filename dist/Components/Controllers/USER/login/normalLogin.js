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
exports.normalLogin = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const token_1 = require("../../../utils/USER/token");
const userPassword_1 = require("../../../utils/USER/normalLogin/userPassword");
const normalLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let email = userdata === null || userdata === void 0 ? void 0 : userdata.email;
        let password = userdata === null || userdata === void 0 ? void 0 : userdata.password;
        if (!email || !password) {
            res
                .status(500)
                .json({ "detail": "Email or password not supplied." });
            return;
        }
        ;
        password = (yield (0, userPassword_1.userPasswordToken)(password)) || "";
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                username: `${email}`,
                password: `${password}`,
                socialflag: false
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ "detail": "Invalid login. Check email and password." });
        }
        ;
        if (!((userData === null || userData === void 0 ? void 0 : userData.registrationStatus) === "REGISTERED")) {
            res
                .status(400)
                .json({ "detail": "User has not completed registration." });
        }
        ;
        if ((userData === null || userData === void 0 ? void 0 : userData.activeStatus) === false) {
            res
                .status(400)
                .json({ "detail": "User has been blocked." });
        }
        else {
            let userid = userData === null || userData === void 0 ? void 0 : userData.id;
            let full_name = userData === null || userData === void 0 ? void 0 : userData.displayname;
            let tokenobject = {
                id: userid,
                displayname: full_name
            };
            let token = yield (0, token_1.generateToken)(tokenobject);
            res
                .status(200)
                .json({
                success: {
                    message: "Already exists.",
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
            .json({ detail: error });
        return;
    }
    ;
});
exports.normalLogin = normalLogin;
