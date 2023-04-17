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
exports.Tblordertrackerdetails = void 0;
const typeorm_1 = require("typeorm");
const Tblordertracker_1 = require("./Tblordertracker");
let Tblordertrackerdetails = class Tblordertrackerdetails {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "idtblordertracker_details" }),
    __metadata("design:type", Number)
], Tblordertrackerdetails.prototype, "idtblordertrackerDetails", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "itemname", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "itemname", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "orderedat", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "orderedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "completedat", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "completedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "totaltime", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "totaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "modification", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "modification", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "avgpreptime", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "avgpreptime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "preptimedifference", nullable: true, length: 14 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "preptimedifference", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "item_price", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "itemPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "category", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "voidat", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "voidat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "voidtotaltime", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "voidtotaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "ordertracker_id", nullable: true }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "ordertrackerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "description", nullable: true, length: 100 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "is_taxable", nullable: true, width: 1 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "isTaxable", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "productID", nullable: true }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "unit", nullable: true, length: 15 }),
    __metadata("design:type", Object)
], Tblordertrackerdetails.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tblordertracker_1.Tblordertracker, (tblordertracker) => tblordertracker.tblordertrackerdetails, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
    (0, typeorm_1.JoinColumn)([{ name: "ordertracker_id", referencedColumnName: "id" }]),
    __metadata("design:type", Tblordertracker_1.Tblordertracker)
], Tblordertrackerdetails.prototype, "ordertracker", void 0);
Tblordertrackerdetails = __decorate([
    (0, typeorm_1.Index)("tblordert_ordertracker_id_b772ac4b_fk_quickstar", ["ordertrackerId"], {}),
    (0, typeorm_1.Entity)()
], Tblordertrackerdetails);
exports.Tblordertrackerdetails = Tblordertrackerdetails;
