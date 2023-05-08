"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const addOperatingLocation_1 = require("../../../../Components/Controllers/Admin/addOperatingLocation");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const sessionChecker_1 = require("../../../../Components/Middlewares/Admin/sessionChecker");
const multer_1 = require("../../../../Components/utils/multer");
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.post(`/${scriptName}`, multer_1.upload.single("file"), sessionChecker_1.adminSessionChecker, addOperatingLocation_1.addOperatingLocation);
