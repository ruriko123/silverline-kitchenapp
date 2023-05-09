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
exports.editUserProfile = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const token_1 = require("../../../utils/USER/token");
const getCurrentTime_1 = require("../../../utils/time/getCurrentTime");
const token_2 = require("../../../utils/USER/token");
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
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
        if (!full_name) {
            res
                .status(400)
                .json({ "error": "Full name is missing." });
            return;
        }
        ;
        let modifiedDate = yield (0, getCurrentTime_1.getCurrentTime)();
        let modifiedby = "SELF";
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
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                id: userid
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
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(Tbluser_1.Tbluser)
                .set({
                modifiedby: modifiedby,
                modifiedDate: modifiedDate,
                locationName: address,
                lat: lat,
                long: long,
                phone: phone,
                displayname: full_name
            })
                .where("id = :id", { id: userid })
                .execute();
            let newuserinfo = yield app_data_source_1.default
                .getRepository(Tbluser_1.Tbluser)
                .createQueryBuilder("t")
                .select([
                "t.id",
                "t.displayname",
                "t.email",
                "t.phone",
                "t.locationName",
                "t.altphone",
                "t.points",
                "t.profilepicture"
            ])
                .where({ id: userid })
                .getOne();
            let tokenobject = {
                id: newuserinfo === null || newuserinfo === void 0 ? void 0 : newuserinfo.id,
                displayname: newuserinfo === null || newuserinfo === void 0 ? void 0 : newuserinfo.displayname
            };
            let token = yield (0, token_2.generateToken)(tokenobject);
            res
                .status(200)
                .json({ newinfo: newuserinfo, token: token });
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
exports.editUserProfile = editUserProfile;
