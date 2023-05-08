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
exports.emitOrder = void 0;
const index_1 = require("@base/index");
const socketJoinToken_1 = require("@socket/socketJoinToken");
const emitOrder = (outletName, orderObject) => __awaiter(void 0, void 0, void 0, function* () {
    let outletHash = yield (0, socketJoinToken_1.createOutletHash)(outletName);
    console.log(outletHash);
    index_1.io.emit(`${outletHash}`, orderObject);
    return;
});
exports.emitOrder = emitOrder;
