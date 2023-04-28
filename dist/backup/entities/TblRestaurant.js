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
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], TblRestaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Name", nullable: true, length: 150 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Address", nullable: true, length: 70 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Phone", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Pan", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "pan", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "AltPhone", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "altPhone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Email", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "long", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "lat", nullable: true, length: 20 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "details", nullable: true, length: 90 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "logo", nullable: true, length: 250 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "coverimage", nullable: true, length: 250 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "coverimage", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "contactPerson", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "commission", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "slogan", nullable: true, length: 150 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "slogan", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isResproclient", default: () => "'1'" }),
    __metadata("design:type", Number)
], TblRestaurant.prototype, "isResproclient", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deletedBy", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "addedBy", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "addedDate", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "addedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "deletedDate", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "lastModifiedBy", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isActive", default: () => "'0'" }),
    __metadata("design:type", Number)
], TblRestaurant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "baseURL", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "baseUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "openingTime", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "openingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "closingTime", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "closingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isPopular", default: () => "'0'" }),
    __metadata("design:type", Number)
], TblRestaurant.prototype, "isPopular", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "operatingLocation",
        nullable: true,
        length: 70,
        default: () => "'KATHMANDU'",
    }),
    __metadata("design:type", Object)
], TblRestaurant.prototype, "operatingLocation", void 0);
TblRestaurant = __decorate([
    (0, typeorm_1.Entity)("tbl_restaurant", { schema: "kitchenDB" })
], TblRestaurant);
exports.TblRestaurant = TblRestaurant;
