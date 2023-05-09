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
exports.userRegistrationDetails = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const userPassword_1 = require("../../../utils/USER/normalLogin/userPassword");
var toonavatar = require('cartoon-avatar');
const token_1 = require("../../../utils/USER/token");
const token_2 = require("../../../utils/USER/token");
const userRegistrationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let password = userdata === null || userdata === void 0 ? void 0 : userdata.password;
        let full_name = userdata === null || userdata === void 0 ? void 0 : userdata.full_name;
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
                .json({ detail: "Password is missing." });
            return;
        }
        ;
        if (!(password.length >= 8 && password.length <= 15)) {
            res
                .status(400)
                .json({ detail: "Password must be between 8 to 15 characters in length." });
            return;
        }
        ;
        if (!full_name) {
            res
                .status(400)
                .json({ detail: "Full name is missing." });
            return;
        }
        ;
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        let tokendata = yield (0, token_1.decodeToken)(token);
        if (!tokendata || (tokendata === null || tokendata === void 0 ? void 0 : tokendata.error)) {
            res
                .status(303)
                .json({ detail: "error while reading token." });
            return;
        }
        ;
        let userid = tokendata === null || tokendata === void 0 ? void 0 : tokendata.id;
        password = (yield (0, userPassword_1.userPasswordToken)(password)) || "";
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
        if (!((userData === null || userData === void 0 ? void 0 : userData.otpStep) === "COMPLETED")) {
            res
                .status(400)
                .json({ detail: "OTP verification not completed." });
            return;
        }
        else {
            var url = yield toonavatar.generate_avatar();
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(Tbluser_1.Tbluser)
                .set({
                registrationStatus: "REGISTERED",
                profilepicture: url,
                firebaseToken: firebasetoken,
                deviceType: devicetype,
                deviceId: deviceid,
                locationName: address,
                lat: lat,
                long: long,
                phone: phone,
                socialflag: false,
                password: password,
                displayname: full_name
            })
                .where("id = :id", { id: userid })
                .execute();
            let tokenobject = {
                id: userData === null || userData === void 0 ? void 0 : userData.id,
                displayname: full_name
            };
            let token = yield (0, token_2.generateToken)(tokenobject);
            res
                .status(200)
                .json({
                success: {
                    message: "User has been registered.",
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
exports.userRegistrationDetails = userRegistrationDetails;
