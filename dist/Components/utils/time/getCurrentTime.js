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
exports.getCurrentTime = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
(0, moment_timezone_1.default)().format();
const getCurrentTime = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = yield moment_timezone_1.default.tz((0, moment_timezone_1.default)(), 'Asia/Kathmandu').format('YYYY-MM-DD HH:mm:ss Z');
    return currentTime;
});
exports.getCurrentTime = getCurrentTime;
