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
exports.check3Ptoken = void 0;
const TblThirdparty_1 = require("@model/TblThirdparty");
const app_data_source_1 = __importDefault(require("@base/app-data-source"));
const check3Ptoken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            let errordata = {
                "tokenError": `Token not provided.`
            };
            return errordata;
        }
        const thirdPartyCheck = yield app_data_source_1.default
            .getRepository(TblThirdparty_1.TblThirdparty)
            .findOne({
            where: {
                Token: `${token}`
            }
        });
        if (!thirdPartyCheck) {
            let errordata = {
                "tokenError": `Invalid token.`
            };
            return errordata;
        }
        else {
            return thirdPartyCheck;
        }
    }
    catch (err) {
        let errordata = {
            "error": `${err}`
        };
        return errordata;
    }
    ;
});
exports.check3Ptoken = check3Ptoken;
