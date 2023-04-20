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
exports.adminLogout = void 0;
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req
            .session
            .destroy(function (err) {
            console.log('Destroyed session');
        });
        res.redirect('/login');
        return;
    }
    catch (error) {
        res.status(500).json({ "error": error });
        return;
    }
    ;
});
exports.adminLogout = adminLogout;
