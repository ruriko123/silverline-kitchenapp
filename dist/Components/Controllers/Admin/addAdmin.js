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
exports.addAdmin = void 0;
const AdminHash_1 = require("../../../Components/utils/AdminHash");
const TblAdmin_1 = require("../../../ORM/entities/TblAdmin");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let userName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
        let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
        let PermissionType = (_c = req.body) === null || _c === void 0 ? void 0 : _c.PermissionType;
        let userData = yield app_data_source_1.default
            .getRepository(TblAdmin_1.TblAdmin)
            .findOne({
            where: {
                userName: `${userName}`
            }
        });
        if (userData) {
            res
                .status(400)
                .json({ "error": "Admin with this username already registered." });
            return;
        }
        else {
            const admintable = new TblAdmin_1.TblAdmin();
            password = yield (0, AdminHash_1.adminHash)(password);
            admintable.userName = userName;
            admintable.Password = password;
            admintable.PermissionType = PermissionType;
            yield app_data_source_1.default
                .manager
                .save(admintable);
            res
                .status(200)
                .json({ "success": "Admin account created." });
            return;
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ "error": error });
        return;
    }
});
exports.addAdmin = addAdmin;
