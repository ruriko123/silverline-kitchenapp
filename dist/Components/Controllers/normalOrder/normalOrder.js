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
exports.normalOrder = void 0;
const saveOrder_1 = require("../../../Components/Middlewares/saveOrder");
const checkThirdPartytoken_1 = require("../../../Components/utils/checkThirdPartytoken");
const normalOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* Validate the token*/
        let tokenresult = yield (0, checkThirdPartytoken_1.check3Ptoken)(req.get("token"));
        if ("error" in tokenresult) {
            res
                .status(500)
                .json(tokenresult);
            return;
        }
        else if ("tokenError" in tokenresult) {
            res
                .status(401)
                .json({ "error": tokenresult["tokenError"] });
            return;
        }
        ;
        /* tokenresult returns the company details which is passed with the "order" object*/
        let order = req === null || req === void 0 ? void 0 : req.body;
        order["customerName"] = tokenresult.CompanyName;
        order["customerPhone"] = tokenresult.Phone || tokenresult.AltPhone;
        order["Address"] = tokenresult.Address;
        /* The device posts the order JSON which is passed to the saveOrder middleware */
        let result = yield (0, saveOrder_1.saveOrder)(order);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        }
        else {
            /* After the middleware emits the data to the device through socket connection, the same data is sent back to the user who post it  */
            res
                .status(200)
                .json(result["success"]);
            return;
        }
        ;
    }
    catch (err) {
        res
            .status(500)
            .json(err);
        return;
    }
    ;
});
exports.normalOrder = normalOrder;
