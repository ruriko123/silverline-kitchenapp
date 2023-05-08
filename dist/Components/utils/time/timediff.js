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
exports.resendgetTimeAfterTimeout = exports.getTimeAfterTimeout = exports.getTimeDiff = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
(0, moment_timezone_1.default)().format();
const getTimeDiff = (firstDate, secondDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let a = yield moment_timezone_1.default.tz((0, moment_timezone_1.default)(firstDate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu');
        let b = yield moment_timezone_1.default.tz((0, moment_timezone_1.default)(secondDate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu');
        let diff = a.diff(b, 'minutes');
        return Math.abs(diff);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
    ;
});
exports.getTimeDiff = getTimeDiff;
const getTimeAfterTimeout = (firstdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield moment_timezone_1.default.tz((0, moment_timezone_1.default)(firstdate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu')
            .add(process.env.REGISTRATION_otpTimeout, 'm')
            .format('hh:mm:ss A');
        return result;
    }
    catch (error) {
        return `${process.env.REGISTRATION_otpTimeout} minutes`;
    }
    ;
});
exports.getTimeAfterTimeout = getTimeAfterTimeout;
const resendgetTimeAfterTimeout = (firstdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let addtime = parseInt(`${process.env.OTP_RESEND_TIMEOUT}`);
        let result = yield moment_timezone_1.default.tz((0, moment_timezone_1.default)(firstdate, "YYYY-MM-DD HH:mm:ss Z"), 'Asia/Kathmandu').add(addtime, 'm').format("YYYY-MM-DD HH:mm:ss Z");
        return result;
    }
    catch (error) {
        return `${process.env.OTP_RESEND_TIMEOUT} minutes`;
    }
    ;
});
exports.resendgetTimeAfterTimeout = resendgetTimeAfterTimeout;
