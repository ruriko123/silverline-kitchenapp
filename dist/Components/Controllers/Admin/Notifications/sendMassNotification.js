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
exports.AdminsendMassNotification = void 0;
const app_data_source_1 = __importDefault(require("../../../../app-data-source"));
const Tbluser_1 = require("../../../../ORM/entities/Tbluser");
const sendMassNotification_1 = require("../../../utils/firebase/sendMassNotification");
const AdminsendMassNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let title = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title;
        let subject = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.subject;
        let preferredlocation = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.preferredlocation;
        if (!title) {
            res
                .status(400)
                .json({ error: "Title missing" });
            return;
        }
        ;
        if (!subject) {
            res
                .status(400)
                .json({ error: "Subject missing" });
            return;
        }
        ;
        if (!preferredlocation) {
            res
                .status(400)
                .json({ error: "preferredlocation missing." });
            return;
        }
        ;
        let firebasetokens;
        if (preferredlocation === "ALL") {
            firebasetokens = yield app_data_source_1.default
                .getRepository(Tbluser_1.Tbluser)
                .createQueryBuilder("t")
                .select(["t.firebaseToken"])
                .where({ registrationStatus: "REGISTERED", activeStatus: true })
                .andWhere("firebaseToken IS NOT NULL")
                .getMany();
        }
        else {
            firebasetokens = yield app_data_source_1.default
                .getRepository(Tbluser_1.Tbluser)
                .createQueryBuilder("t")
                .select(["t.firebaseToken"])
                .where({ registrationStatus: "REGISTERED", activeStatus: true, preferredlocation: preferredlocation })
                .andWhere("firebaseToken IS NOT NULL")
                .getMany();
        }
        ;
        if (!firebasetokens) {
            res
                .status(400)
                .json({ error: "Couldn't find firebase tokens." });
            return;
        }
        ;
        try {
            (0, sendMassNotification_1.sendMassNotification)(firebasetokens, title, subject);
        }
        catch (error) {
            res
                .status(400)
                .json({ error: "Error occured while sending mass notification." });
            return;
        }
        res
            .status(200)
            .json({ success: "Mass notification sent." });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error });
        return;
    }
    ;
});
exports.AdminsendMassNotification = AdminsendMassNotification;
