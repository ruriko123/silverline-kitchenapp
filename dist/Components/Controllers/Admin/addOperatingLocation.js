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
exports.addOperatingLocation = void 0;
const TbloperatingLocations_1 = require("../../../ORM/entities/TbloperatingLocations");
const app_data_source_1 = __importDefault(require("../../../app-data-source"));
const addOperatingLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file || Object.keys(req.file).length === 0) {
            return res
                .status(400)
                .send('No files were uploaded.');
        }
        ;
        let filepath = `/uploads/${req.file.filename}`;
        var fullUrl = req.protocol + '://' + req.get('host') + filepath;
        let locationName = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.locationName;
        locationName = `${locationName}`.toUpperCase();
        let checkLocationExists = yield app_data_source_1.default
            .getRepository(TbloperatingLocations_1.TbloperatingLocations)
            .findOne({
            where: {
                LocationName: `${locationName}`
            }
        });
        if (checkLocationExists) {
            res
                .status(400)
                .json({ error: "Operating location already exists." });
            return;
        }
        else {
            const operatingLocations = new TbloperatingLocations_1.TbloperatingLocations();
            operatingLocations.LocationName = `${locationName}`;
            operatingLocations.IMAGEURL = fullUrl;
            operatingLocations.isActive = true;
            yield app_data_source_1.default
                .manager
                .save(operatingLocations);
            res
                .status(200)
                .json({ success: "File uploaded.", url: fullUrl });
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
exports.addOperatingLocation = addOperatingLocation;
