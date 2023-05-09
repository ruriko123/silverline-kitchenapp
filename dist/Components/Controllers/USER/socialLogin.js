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
exports.socialLogin = void 0;
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const Tbluser_1 = require("../../../ORM/entities/Tbluser");
const token_1 = require("../../utils/USER/token");
var toonavatar = require('cartoon-avatar');
const socialLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let social_token = userdata === null || userdata === void 0 ? void 0 : userdata.social_token;
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
        if (!social_token || !full_name) {
            res
                .status(400)
                .json({ detail: "Missing parameters." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                username: `${social_token}`
            }
        });
        if (!userData) {
            var url = yield toonavatar.generate_avatar();
            let tbluser = new Tbluser_1.Tbluser();
            tbluser.username = social_token;
            tbluser.displayname = full_name;
            tbluser.socialflag = true;
            tbluser.email = email;
            tbluser.phone = phone;
            tbluser.long = long;
            tbluser.lat = lat;
            tbluser.locationName = address;
            tbluser.deviceId = deviceid;
            tbluser.deviceType = devicetype;
            tbluser.firebaseToken = firebasetoken;
            tbluser.profilepicture = url;
            let a = yield app_data_source_1.default
                .manager
                .save(tbluser);
            let userid = a === null || a === void 0 ? void 0 : a.id;
            let tokenobject = {
                id: userid,
                displayname: full_name
            };
            let token = yield (0, token_1.generateToken)(tokenobject);
            if (!token) {
                res
                    .status(303)
                    .json({ "detail": "Error while generating token." });
                return;
            }
            else {
                res
                    .status(200)
                    .json({
                    success: {
                        message: "User created.",
                        token: token
                    }
                });
                return;
            }
            ;
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
exports.socialLogin = socialLogin;
