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
exports.createOutletHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createOutletHash = (outletName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outletHash = crypto_1.default
            .createHash('sha256')
            .update(`${outletName}`, 'binary')
            .digest('hex');
        return outletHash.substring(0, 8);
    }
    catch (error) {
        return false;
    }
});
exports.createOutletHash = createOutletHash;
