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
exports.user_Tblordertracker = void 0;
const typeorm_1 = require("typeorm");
const user_Tblordertrackerdetails_1 = require("./user_Tblordertrackerdetails");
const TblRestaurant_1 = require("./TblRestaurant");
let user_Tblordertracker = class user_Tblordertracker {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" }),
    __metadata("design:type", Number)
], user_Tblordertracker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "outlet_orderid",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "outletOrderid", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "customerName",
        nullable: true,
        length: 70
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "customerPhone",
        nullable: true,
        length: 30
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "customerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deliverycustomerName",
        nullable: true,
        length: 70
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "deliverycustomerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deliverycustomerPhone",
        nullable: true,
        length: 30
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "deliverycustomerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "altdeliverycustomerPhone",
        nullable: true,
        length: 30
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "altdeliverycustomerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deliverycustomerAddress",
        nullable: true,
        length: 250
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "deliverycustomerAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "restaurantID",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "restaurantID", void 0);
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
], user_Tblordertracker.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Address",
        nullable: true,
        length: 200
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deliveryVia",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "deliveryVia", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "date",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "tablenum",
        nullable: true,
        length: 10
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "tablenum", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "orderedat",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "orderedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "completedat",
        nullable: true,
        length: 10
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "completedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "totaltime",
        nullable: true,
        length: 10
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "totaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "ordertype",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "ordertype", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "currentstate",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "currentstate", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "outlet_name",
        nullable: true,
        length: 150
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "outletName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "employee",
        nullable: true,
        length: 50
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "guest_count",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "guestCount", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "kotid",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertracker.prototype, "kotid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_Tblordertrackerdetails_1.user_Tblordertrackerdetails, (user_tblordertrackerdetails) => user_tblordertrackerdetails.ordertracker),
    __metadata("design:type", Array)
], user_Tblordertracker.prototype, "user_tblordertrackerdetails", void 0);
user_Tblordertracker = __decorate([
    (0, typeorm_1.Entity)()
], user_Tblordertracker);
exports.user_Tblordertracker = user_Tblordertracker;
