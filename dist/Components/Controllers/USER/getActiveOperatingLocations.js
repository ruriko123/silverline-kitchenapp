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
exports.getActiveOperatingLocations = void 0;
const TbloperatingLocations_1 = require("../../../ORM/entities/TbloperatingLocations");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const getActiveOperatingLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = yield app_data_source_1.default
            .getRepository(TbloperatingLocations_1.TbloperatingLocations).createQueryBuilder("t").select(["t.id", "t.LocationName", "t.IMAGEURL", "t.isActive"])
            .where({ isActive: true })
            .getMany();
        if (!userData) {
            res
                .status(400)
                .json({ "error": "No data available." });
            return;
        }
        ;
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
exports.getActiveOperatingLocations = getActiveOperatingLocations;
