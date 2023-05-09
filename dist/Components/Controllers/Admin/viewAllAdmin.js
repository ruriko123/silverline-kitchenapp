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
exports.viewAllAdmin = void 0;
const TblAdmin_1 = require("../../../ORM/entities/TblAdmin");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const viewAllAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = yield app_data_source_1.default
            .getRepository(TblAdmin_1.TblAdmin).createQueryBuilder("t").select(["t.id", "t.isActive", "t.userName", "t.isMainAdmin"])
            .getMany();
        res
            .status(200)
            .json(userData);
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
exports.viewAllAdmin = viewAllAdmin;
