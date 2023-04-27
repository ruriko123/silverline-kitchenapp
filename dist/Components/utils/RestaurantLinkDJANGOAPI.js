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
exports.RestaurantLinkDJANGOAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
const RestaurantLinkDJANGOAPI = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data["KEY"] = process.env.DJANGO_KEY;
    try {
        let djangoAPIURL = `${data.BASEURL}/api/create-customer/`;
        if (data.type === "LINK") {
            axios_1.default
                .post(djangoAPIURL, data)
                .then(function (response) {
                console.log(response === null || response === void 0 ? void 0 : response.data);
                return;
            })
                .catch(function (error) {
                console.log(error);
                return;
            });
        }
        ;
        if (data.type === "UNLINK") {
            axios_1.default
                .put(djangoAPIURL, data)
                .then(function (response) {
                console.log(response === null || response === void 0 ? void 0 : response.data);
                return;
            })
                .catch(function (error) {
                console.log(error);
                return;
            });
        }
        return;
    }
    catch (error) {
        console.log(error);
        return;
    }
    ;
});
exports.RestaurantLinkDJANGOAPI = RestaurantLinkDJANGOAPI;
