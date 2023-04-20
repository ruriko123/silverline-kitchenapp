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
exports.thirdPartyupdate = void 0;
const TblThirdparty_1 = require("../../../ORM/entities/TblThirdparty");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const typeorm_1 = require("typeorm");
const thirdPartyupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        let Name = (_b = req.body) === null || _b === void 0 ? void 0 : _b.Name;
        // let Address : string = req.body
        //     ?.Address;
        // let Phone : string = req.body
        //     ?.Phone;
        // let Pan : string = req.body
        //     ?.Pan;
        // let AltPhone : string = req.body
        //     ?.AltPhone || "";
        // let Email : string = req.body
        //     ?.Email;
        // let addedBy : string = req.session
        //     ?.adminName || "";
        // let baseURL:string=req.body?.baseURL;
        if (!id || !Name) {
            res
                .status(401)
                .json({ "error": "Company ID or name not supplied." });
            return;
        }
        req.body["CompanyName"] = Name;
        delete req.body["id"];
        let userData = yield app_data_source_1.default
            .getRepository(TblThirdparty_1.TblThirdparty)
            .findOne({
            where: {
                CompanyName: `${req.body["Name"]}`,
                id: (0, typeorm_1.Not)(id)
            }
        });
        if (userData) {
            res
                .status(400)
                .json({ "error": "Company name already registered. Try with another name." });
            return;
        }
        else {
            delete req.body["Name"];
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblThirdparty_1.TblThirdparty)
                .set(req.body)
                .where("id = :id", { id: id })
                .execute();
            res
                .status(200)
                .json({ "success": "Third party updated successfully." });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ "error": error });
        return;
    }
});
exports.thirdPartyupdate = thirdPartyupdate;
