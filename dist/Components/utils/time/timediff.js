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
exports.getTimeAfterTimeout = exports.getTimeDiff = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
(0, moment_timezone_1.default)().format();
const getTimeDiff = (firstDate, secondDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let a = (0, moment_timezone_1.default)(firstDate, "YYYY-MM-DD HH:mm:ss Z");
        let b = (0, moment_timezone_1.default)(secondDate, "YYYY-MM-DD HH:mm:ss Z");
        let diff = a.diff(b, 'minutes');
        return diff;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
    ;
});
exports.getTimeDiff = getTimeDiff;
const getTimeAfterTimeout = (firstdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield (0, moment_timezone_1.default)(firstdate, "YYYY-MM-DD HH:mm:ss Z")
            .add(process.env.REGISTRATION_otpTimeout, 'minutes')
            .format('LTS');
        return result;
    }
    catch (error) {
        return `${process.env.REGISTRATION_otpTimeout} minutes`;
    }
    ;
});
exports.getTimeAfterTimeout = getTimeAfterTimeout;
