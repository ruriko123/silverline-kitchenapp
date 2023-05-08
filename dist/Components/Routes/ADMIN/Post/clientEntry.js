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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var path = require('path');
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
const saveOrder_1 = require("../../../../Components/Middlewares/saveOrder");
router.post(`/${scriptName}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order = req === null || req === void 0 ? void 0 : req.body;
        /* The device posts the order JSON which is passed to the saveOrder middleware */
        let result = yield (0, saveOrder_1.saveOrder)(order);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        }
        else if ("tokenError" in result) {
            res
                .status(401)
                .json({ "error": result["tokenError"] });
            return;
        }
        else if ("notokenError" in result) {
            res
                .status(401)
                .json({ "error": result["notokenError"] });
            return;
        }
        else {
            /* After the middleware emits the data to the device through socket connection, the same data is sent back to the user who post it  */
            res
                .status(200)
                .json(result["success"]);
            return;
        }
        ;
    }
    catch (err) {
        res
            .status(500)
            .json(err);
        return;
    }
    ;
}));
