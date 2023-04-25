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
exports.CheckAdminLogin = void 0;
const CheckAdminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req) {
        return "";
    }
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session);
    if (req.session && req.session.admin) {
        res.status(200).json({ "status": true });
    }
    else {
        res.status(500).json({ "status": false });
    }
    ;
});
exports.CheckAdminLogin = CheckAdminLogin;
