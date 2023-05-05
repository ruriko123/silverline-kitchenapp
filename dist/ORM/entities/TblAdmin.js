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
exports.TblAdmin = void 0;
const typeorm_1 = require("typeorm");
let TblAdmin = class TblAdmin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], TblAdmin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "userName",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Password",
        nullable: true,
        default: null,
        length: 200
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isMainAdmin",
        default: false
    }),
    __metadata("design:type", Boolean)
], TblAdmin.prototype, "isMainAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "PermissionType",
        nullable: true,
        default: null,
        length: 30
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "PermissionType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Token",
        nullable: true,
        default: null,
        length: 200
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "Token", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: true
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedBy",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedDate",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblAdmin.prototype, "addedDate", void 0);
TblAdmin = __decorate([
    (0, typeorm_1.Entity)()
], TblAdmin);
exports.TblAdmin = TblAdmin;
