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
exports.AdminInActive = void 0;
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const TblAdmin_1 = require("../../../ORM/entities/TblAdmin");
const AdminInActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res
                .status(401)
                .json({ "error": "Admin ID not supplied." });
            return;
        }
        ;
        let userData = yield app_data_source_1.default
            .getRepository(TblAdmin_1.TblAdmin)
            .findOne({
            where: {
                id: id,
                isMainAdmin: false
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({ error: "Admin with this ID does not exist or cannot be made inactive." });
            return;
        }
        else {
            yield app_data_source_1.default
                .createQueryBuilder()
                .update(TblAdmin_1.TblAdmin)
                .set({ isActive: false })
                .where("id = :id", { id: id })
                .execute();
            res
                .status(200)
                .json({ "success": "Admin made active." });
            return;
        }
        ;
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error });
        return;
    }
    ;
});
exports.AdminInActive = AdminInActive;
