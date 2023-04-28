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
exports.TblThirdparty = void 0;
const typeorm_1 = require("typeorm");
let TblThirdparty = class TblThirdparty {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], TblThirdparty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Phone", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Pan", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "pan", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "AltPhone", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "altPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Token", nullable: true, length: 200 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isActive", default: () => "'1'" }),
    __metadata("design:type", Number)
], TblThirdparty.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deletedBy", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "addedBy", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "addedDate", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "addedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deletedDate", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "CompanyName", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Address", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Email", nullable: true, length: 70 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "baseURL", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "baseUrl", void 0);
TblThirdparty = __decorate([
    (0, typeorm_1.Entity)("tbl_thirdparty", { schema: "kitchenDB" })
], TblThirdparty);
exports.TblThirdparty = TblThirdparty;
