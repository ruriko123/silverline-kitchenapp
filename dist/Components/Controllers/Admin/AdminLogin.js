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
exports.adminLogin = void 0;
const AdminHash_1 = require("../../../Components/utils/AdminHash");
const TblAdmin_1 = require("../../../ORM/entities/TblAdmin");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let userName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
        let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
        password = encodeURIComponent(password);
        let userData = yield app_data_source_1.default
            .getRepository(TblAdmin_1.TblAdmin)
            .findOne({
            where: {
                userName: `${userName}`
            }
        });
        if (!userData || !(userData === null || userData === void 0 ? void 0 : userData.Password) || (userData === null || userData === void 0 ? void 0 : userData.Password) === "") {
            res
                .status(401)
                .json({ "error": "Invalid credentials" });
            return;
        }
        else {
            let checkDB = yield (0, AdminHash_1.adminHashCompare)(password, userData.Password || "");
            if (checkDB) {
                req.session.admin = true;
                req.session.adminName = userName;
                // res.redirect('/');
                res
                    .status(200)
                    .json({ "success": "Logged In" });
                return;
            }
            else {
                res
                    .status(401)
                    .json({ "error": "Invalid credentials" });
                return;
            }
            ;
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
exports.adminLogin = adminLogin;
