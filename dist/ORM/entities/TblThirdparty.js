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
    __metadata("design:type", Number)
], TblThirdparty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "CompanyName",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "CompanyName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Address",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Phone",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "Phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Pan",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "Pan", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "AltPhone",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "AltPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Email",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "baseURL",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "baseURL", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Token",
        nullable: true,
        length: 200
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "Token", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deletedBy",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedBy",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedDate",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "addedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deletedDate",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: true
    }),
    __metadata("design:type", Object)
], TblThirdparty.prototype, "isActive", void 0);
TblThirdparty = __decorate([
    (0, typeorm_1.Entity)()
], TblThirdparty);
exports.TblThirdparty = TblThirdparty;
