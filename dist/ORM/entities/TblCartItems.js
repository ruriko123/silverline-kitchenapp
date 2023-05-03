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
exports.TblCartItems = void 0;
const typeorm_1 = require("typeorm");
const TblMenu_1 = require("./TblMenu");
const TblCart_1 = require("./TblCart");
let TblCartItems = class TblCartItems {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "IDCartItem" }),
    __metadata("design:type", Number)
], TblCartItems.prototype, "idCartitem", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "cartID",
        nullable: true
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "cartID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TblCart_1.TblCart, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cartID', referencedColumnName: 'idCart' }),
    __metadata("design:type", TblCart_1.TblCart)
], TblCartItems.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "itemID",
        nullable: true
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "itemID", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "ItemName",
        nullable: true,
        length: 100,
        default: null
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "ItemName", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "costPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "costPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "sellingPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        default: 1.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "sellingPricewithTax",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "sellingPricewithTax", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "Taxable",
        default: true
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "Taxable", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: true
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isRemoved",
        default: false
    }),
    __metadata("design:type", Object)
], TblCartItems.prototype, "isRemoved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TblMenu_1.TblMenu, (item) => item.idMenu, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "itemID",
            referencedColumnName: "idMenu"
        }
    ]),
    __metadata("design:type", TblMenu_1.TblMenu)
], TblCartItems.prototype, "item", void 0);
TblCartItems = __decorate([
    (0, typeorm_1.Entity)()
], TblCartItems);
exports.TblCartItems = TblCartItems;
