"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const checkAdminLogin_1 = require("@base/Components/Controllers/Admin/checkAdminLogin");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.get(`/${scriptName}`, checkAdminLogin_1.CheckAdminLogin);
