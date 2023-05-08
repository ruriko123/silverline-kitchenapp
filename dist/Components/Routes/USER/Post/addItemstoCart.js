"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const addItemstoCart_1 = require("@base/Components/Controllers/USER/Cart/addItemstoCart");
const tokenChecker_1 = require("@base/Components/Middlewares/USER/tokenChecker");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.post(`/${scriptName}`, tokenChecker_1.userTokenMiddleware, addItemstoCart_1.addItemstoCart);
