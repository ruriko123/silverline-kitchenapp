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
exports.createTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    let port = parseInt(process.env.EMAIL_smtp_port || "587") || 587;
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: port,
        secure: false,
        auth: {
            user: process.env.EMAIL_sender,
            pass: process.env.EMAIL_sender_pass
        }
    });
    return transporter;
});
exports.createTransporter = createTransporter;
