"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const deleteAdmin_1 = require("@base/Components/Controllers/Admin/deleteAdmin");
const sessionChecker_1 = require("@base/Components/Middlewares/Admin/sessionChecker");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.post(`/${scriptName}`, sessionChecker_1.adminSessionChecker, deleteAdmin_1.deleteAdmin);
