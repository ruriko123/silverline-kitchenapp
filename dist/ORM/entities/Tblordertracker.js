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
exports.Tblordertracker = void 0;
const typeorm_1 = require("typeorm");
const Tblordertrackerdetails_1 = require("./Tblordertrackerdetails");
let Tblordertracker = class Tblordertracker {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], Tblordertracker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "outlet_orderid", nullable: true }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "outletOrderid", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "date", nullable: true }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "tablenum", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "tablenum", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "orderedat", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "orderedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "completedat", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "completedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "totaltime", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "totaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "ordertype", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "ordertype", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "currentstate", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "currentstate", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "outlet_name", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "outletName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "employee", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "guest_count", nullable: true }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "guestCount", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "kotid", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "kotid", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "customer_name", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tblordertracker.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tblordertrackerdetails_1.Tblordertrackerdetails, (tblordertrackerdetails) => tblordertrackerdetails.ordertracker),
    __metadata("design:type", Array)
], Tblordertracker.prototype, "tblordertrackerdetails", void 0);
Tblordertracker = __decorate([
    (0, typeorm_1.Entity)()
], Tblordertracker);
exports.Tblordertracker = Tblordertracker;
