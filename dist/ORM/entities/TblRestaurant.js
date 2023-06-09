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
exports.TblRestaurant = void 0;
const typeorm_1 = require("typeorm");
let TblRestaurant = class TblRestaurant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], TblRestaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Name",
        nullable: true,
        default: null,
        length: 150
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Address",
        nullable: true,
        default: null,
        length: 70
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Phone",
        nullable: true,
        default: null,
        length: 20
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "Phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Pan",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "Pan", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "AltPhone",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "AltPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Email",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "long",
        nullable: true,
        default: null,
        length: 20
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "lat",
        nullable: true,
        default: null,
        length: 20
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "details",
        nullable: true,
        default: null,
        length: 150
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "logo",
        nullable: true,
        default: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30151524/822.png",
        length: 500
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "coverimage",
        nullable: true,
        default: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30151524/822.png",
        length: 500
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "coverimage", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "contactPerson",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "commission",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "slogan",
        nullable: true,
        default: null,
        length: 150
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "slogan", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isResproclient",
        default: true,
    }),
    __metadata("design:type", Boolean)
], TblRestaurant.prototype, "isResproclient", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deletedBy",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedBy",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "addedDate",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "addedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "deletedDate",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "lastModifiedBy",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "baseURL",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "baseURL", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "openingTime",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "openingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "closingTime",
        nullable: true,
        default: null,
        length: 50
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "closingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "operatingLocation",
        nullable: true,
        default: "KATHMANDU",
        length: 70
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "operatingLocation", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isActive",
        default: false
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isCloudKitchen",
        default: false
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "isCloudKitchen", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "isPopular",
        default: false
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "isPopular", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "menuUploaded",
        default: false
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "menuUploaded", void 0);
TblRestaurant = __decorate([
    (0, typeorm_1.Entity)()
], TblRestaurant);
exports.TblRestaurant = TblRestaurant;
