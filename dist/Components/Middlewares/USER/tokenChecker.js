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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokenMiddleware = void 0;
const token_1 = require("../../utils/USER/token");
const userTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req) {
        return;
    }
    ;
    if (!((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token)) {
        res.status(400).json({ detail: "No token provided." });
        return;
    }
    let token = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.token;
    let tokenresult = yield (0, token_1.decodeToken)(token);
    if (tokenresult === null || tokenresult === void 0 ? void 0 : tokenresult.error) {
        res.status(401).json({ detail: "Invalid token." });
        return;
    }
    else {
        next();
    }
    ;
});
exports.userTokenMiddleware = userTokenMiddleware;
