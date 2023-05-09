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
exports.saveUserPreferredLocation = void 0;
const Tbluser_1 = require("../../../ORM/entities/Tbluser");
const TbloperatingLocations_1 = require("../../../ORM/entities/TbloperatingLocations");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const token_1 = require("../../utils/USER/token");
;
const saveUserPreferredLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let userdata = req === null || req === void 0 ? void 0 : req.body;
        let token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        let userpreferredlocation = userdata === null || userdata === void 0 ? void 0 : userdata.location_id;
        let tokendata = yield (0, token_1.decodeToken)(token);
        if (!tokendata || (tokendata === null || tokendata === void 0 ? void 0 : tokendata.error)) {
            res
                .status(303)
                .json({ detail: "error while reading token." });
            return;
        }
        ;
        let userid = tokendata === null || tokendata === void 0 ? void 0 : tokendata.id;
        let userdisplayname = tokendata === null || tokendata === void 0 ? void 0 : tokendata.displayname;
        let userData = yield app_data_source_1.default
            .getRepository(Tbluser_1.Tbluser)
            .findOne({
            where: {
                id: userid,
                displayname: `${userdisplayname}`
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ detail: "User not found." });
            return;
        }
        ;
        let locationData = yield app_data_source_1.default
            .getRepository(TbloperatingLocations_1.TbloperatingLocations)
            .findOne({
            where: {
                id: userpreferredlocation
            }
        });
        if (!locationData) {
            res
                .status(400)
                .json({ detail: "Wrong preferred loation ID supplied." });
            return;
        }
        ;
        let user = new Tbluser_1.Tbluser();
        user.preferredlocation = locationData.LocationName;
        yield app_data_source_1.default
            .createQueryBuilder()
            .update(Tbluser_1.Tbluser)
            .set({ preferredlocation: locationData.LocationName })
            .where("id = :id", { id: userid })
            .execute();
        res
            .status(200)
            .json({ success: "User's preferred location saved." });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ detail: error });
        return;
    }
    ;
});
exports.saveUserPreferredLocation = saveUserPreferredLocation;
