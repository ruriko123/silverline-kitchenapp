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
exports.createDefaultAdmin = void 0;
const AdminHash_1 = require("@base/Components/utils/AdminHash");
const TblAdmin_1 = require("@model/TblAdmin");
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const createDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.DEFAULTADMINUSERNAME || !process.env.DEFAULTADMINPASSWORD) {
            console.log("FAILURE: cannot read default admin credentials from env file.");
            return;
        }
        let userName = process.env.DEFAULTADMINUSERNAME;
        let password = process.env.DEFAULTADMINPASSWORD;
        let PermissionType = "MAINADMIN";
        let addedBy = "BACKEND";
        let addedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        let userData = yield app_data_source_1.default
            .getRepository(TblAdmin_1.TblAdmin)
            .findOne({
            where: {
                userName: `${userName}`
            }
        });
        if (userData) {
            return;
        }
        else {
            const admintable = new TblAdmin_1.TblAdmin();
            password = yield (0, AdminHash_1.adminHash)(password);
            admintable.userName = userName;
            admintable.Password = password;
            admintable.PermissionType = PermissionType;
            admintable.addedBy = addedBy;
            admintable.addedDate = addedDate;
            admintable.isMainAdmin = true;
            yield app_data_source_1.default
                .manager
                .save(admintable);
            return;
        }
    }
    catch (error) {
        return;
    }
});
exports.createDefaultAdmin = createDefaultAdmin;
