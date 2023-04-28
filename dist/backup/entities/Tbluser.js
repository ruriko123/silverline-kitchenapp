"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tbluser = void 0;
const typeorm_1 = require("typeorm");
let Tbluser = class Tbluser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], Tbluser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "userType",
        nullable: true,
        length: 20,
        default: () => "'user'",
    }),
    __metadata("design:type", Object)
], Tbluser.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "phone", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { name: "password", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "socialflag", nullable: true, width: 1 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "socialflag", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "activeStatus", width: 1, default: () => "'1'" }),
    __metadata("design:type", Boolean)
], Tbluser.prototype, "activeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "otpGeneratedDatetime", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "otpGeneratedDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "otpStep", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "otpStep", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "otpFailAttempts",
        nullable: true,
        default: () => "'0'",
    }),
    __metadata("design:type", Object)
], Tbluser.prototype, "otpFailAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "resentOtp", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "resentOtp", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "otpTimeout", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "otpTimeout", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "resendOtpAttempts",
        nullable: true,
        default: () => "'0'",
    }),
    __metadata("design:type", Object)
], Tbluser.prototype, "resendOtpAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "registrationStatus", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "registrationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "modifiedDate", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "modifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "modifiedby", nullable: true, length: 70 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "modifiedby", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "RegistrationDatetime", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "registrationDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "phoneverificationStatus",
        width: 1,
        default: () => "'0'",
    }),
    __metadata("design:type", Boolean)
], Tbluser.prototype, "phoneverificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "emailverificationStatus",
        width: 1,
        default: () => "'0'",
    }),
    __metadata("design:type", Boolean)
], Tbluser.prototype, "emailverificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "lat", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "long", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "locationName", nullable: true, length: 150 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "locationName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deviceID", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deviceType", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { name: "profilepicture", nullable: true }),
    __metadata("design:type", Object)
], Tbluser.prototype, "profilepicture", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "username", nullable: true, length: 350 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "firebaseToken", nullable: true, length: 350 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "firebaseToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "preferredlocation", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "preferredlocation", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "displayname", nullable: true, length: 70 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "displayname", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "otp", nullable: true, length: 5 }),
    __metadata("design:type", Object)
], Tbluser.prototype, "otp", void 0);
Tbluser = __decorate([
    (0, typeorm_1.Entity)("tbluser", { schema: "kitchenDB" })
], Tbluser);
exports.Tbluser = Tbluser;
