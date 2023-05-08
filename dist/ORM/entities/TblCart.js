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
const TblCartItems_1 = require("./TblCartItems");
let TblCart = class TblCart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "IDCart" }),
    __metadata("design:type", Number)
], TblCart.prototype, "idCart", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "customerID",
        nullable: true
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "customerID", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "restaurantID",
        nullable: true
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "restaurantID", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "taxable",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "taxable", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "taxAmount",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "nontaxable",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "nontaxable", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "subTotal",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "Total",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "Total", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "deliveryCharge",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "deliveryCharge", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "checkoutAt",
        nullable: true,
        length: 120
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "checkoutAt", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: true
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isRemoved",
        default: false
    }),
    __metadata("design:type", Object)
], TblCart.prototype, "isRemoved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tbluser_1.Tbluser, (user) => user.id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "customerID",
            referencedColumnName: "id"
        }
    ]),
    __metadata("design:type", Tbluser_1.Tbluser)
], TblCart.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TblRestaurant_1.TblRestaurant, (restaurant) => restaurant.id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "restaurantID",
            referencedColumnName: "id"
        }
    ]),
    __metadata("design:type", TblRestaurant_1.TblRestaurant)
], TblCart.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TblCartItems_1.TblCartItems, cartitem => cartitem.idCartitem, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", TblCartItems_1.TblCartItems)
], TblCart.prototype, "cartItems", void 0);
TblCart = __decorate([
    (0, typeorm_1.Entity)()
], TblCart);
exports.TblCart = TblCart;
