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
exports.decodeToken = exports.generateToken = void 0;
var jwt = require('jsonwebtoken');
const generateToken = (tokenobject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield jwt.sign(tokenobject, process.env.JWTTOKEN_KEY, { expiresIn: process.env.JWTTOKEN_EXPIRY });
        return token;
    }
    catch (error) {
        return false;
    }
    ;
});
exports.generateToken = generateToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decoded = yield jwt.verify(token, process.env.JWTTOKEN_KEY);
        return decoded;
    }
    catch (error) {
        let data = { error: error };
        return data;
    }
    ;
});
exports.decodeToken = decodeToken;
