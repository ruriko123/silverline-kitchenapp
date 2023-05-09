"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const multer_1 = require("../../../../Components/utils/multer");
const tokenChecker_1 = require("../../../../Components/Middlewares/USER/tokenChecker");
const changeUserPfp_1 = require("../../../../Components/Controllers/USER/profile/changeUserPfp");
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.post(`/${scriptName}`, multer_1.upload.single("file"), tokenChecker_1.userTokenMiddleware, changeUserPfp_1.changerUserPfp);
