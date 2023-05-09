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
exports.addThirdParty = void 0;
const TblThirdparty_1 = require("../../../../ORM/entities/TblThirdparty");
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const thirdPartyToken_1 = require("../../../../Components/utils/thirdPartyToken");
const addThirdParty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        let Name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.Name;
        let Address = (_b = req.body) === null || _b === void 0 ? void 0 : _b.Address;
        let Phone = (_c = req.body) === null || _c === void 0 ? void 0 : _c.Phone;
        let Pan = (_d = req.body) === null || _d === void 0 ? void 0 : _d.Pan;
        let AltPhone = ((_e = req.body) === null || _e === void 0 ? void 0 : _e.AltPhone) || "";
        let Email = (_f = req.body) === null || _f === void 0 ? void 0 : _f.Email;
        let addedBy = ((_g = req.session) === null || _g === void 0 ? void 0 : _g.adminName) || "";
        let baseURL = (_h = req.body) === null || _h === void 0 ? void 0 : _h.baseURL;
        let addedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        if (!Name || !Address || !Phone || !Pan || !AltPhone || !Email || !baseURL) {
            res
                .status(401)
                .json({ "error": "Missing parameters." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblThirdparty_1.TblThirdparty)
            .findOne({
            where: {
                CompanyName: `${Name}`
            }
        });
        if (userData) {
            res
                .status(400)
                .json({ detail: "Company name already registered. Try with another name." });
            return;
        }
        else {
            let Token = yield (0, thirdPartyToken_1.thirdPartyToken)();
            const thirdparty = new TblThirdparty_1.TblThirdparty();
            thirdparty.CompanyName = Name;
            thirdparty.Address = Address;
            thirdparty.Phone = Phone;
            thirdparty.AltPhone = AltPhone;
            thirdparty.Email = Email;
            thirdparty.addedBy = addedBy;
            thirdparty.addedDate = addedDate;
            thirdparty.Token = Token;
            thirdparty.Pan = Pan;
            thirdparty.baseURL = baseURL;
            yield app_data_source_1.default
                .manager
                .save(thirdparty);
            res
                .status(200)
                .json({ "success": "Third party added successfully." });
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
exports.addThirdParty = addThirdParty;
