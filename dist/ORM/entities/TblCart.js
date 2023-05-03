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
exports.TblCart = void 0;
const typeorm_1 = require("typeorm");
const TblRestaurant_1 = require("./TblRestaurant");
const Tbluser_1 = require("./Tbluser");
const TblMenu_1 = require("./TblMenu");
let TblCart = class TblCart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "IDCart" }),
    __metadata("design:type", Number)
], TblCart.prototype, "idCart", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "customerID",
        nullable: true,
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "customerID", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "restaurantID",
        nullable: true,
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "restaurantID", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "itemID",
        nullable: true,
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "itemID", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "ItemName",
        nullable: true,
        length: 100,
        default: null
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "ItemName", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "costPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "costPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "sellingPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "sellingPricewithTax",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "sellingPricewithTax", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "Taxable",
        default: true
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "Taxable", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: true
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TblMenu_1.TblMenu, (item) => item.idMenu, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
    (0, typeorm_1.JoinColumn)([{ name: "itemID", referencedColumnName: "idMenu" }]),
    __metadata("design:type", TblMenu_1.TblMenu)
], TblCart.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tbluser_1.Tbluser, (user) => user.id, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
    (0, typeorm_1.JoinColumn)([{ name: "customerID", referencedColumnName: "id" }]),
    __metadata("design:type", Tbluser_1.Tbluser)
], TblCart.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TblRestaurant_1.TblRestaurant, (restaurant) => restaurant.id, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
    (0, typeorm_1.JoinColumn)([{ name: "restaurantID", referencedColumnName: "id" }]),
    __metadata("design:type", TblRestaurant_1.TblRestaurant)
], TblCart.prototype, "restaurant", void 0);
TblCart = __decorate([
    (0, typeorm_1.Entity)()
], TblCart);
exports.TblCart = TblCart;
