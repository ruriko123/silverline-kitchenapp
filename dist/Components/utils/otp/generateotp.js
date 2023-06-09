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
exports.generateOTP = void 0;
const otpGenerator = require('otp-generator');
const generateOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let otplength = parseInt(`${process.env.OTP_LENGTH}` || "4") || 4;
        let generatedOtp = yield otpGenerator.generate(otplength, { upperCaseAlphabets: false, specialChars: false });
        return generatedOtp;
    }
    catch (error) {
        throw new Error('Error while generating OTP.');
    }
});
exports.generateOTP = generateOTP;
