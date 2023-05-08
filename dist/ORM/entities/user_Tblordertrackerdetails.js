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
exports.user_Tblordertrackerdetails = void 0;
const typeorm_1 = require("typeorm");
const user_Tblordertracker_1 = require("./user_Tblordertracker");
const TblMenu_1 = require("./TblMenu");
let user_Tblordertrackerdetails = class user_Tblordertrackerdetails {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "idtblordertracker_details" }),
    __metadata("design:type", Number)
], user_Tblordertrackerdetails.prototype, "idtblordertrackerDetails", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "itemname",
        nullable: true,
        length: 100
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "itemname", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "orderedat",
        nullable: true,
        length: 120
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "orderedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "completedat",
        nullable: true,
        length: 120
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "completedat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "totaltime",
        nullable: true,
        length: 120
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "totaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "modification",
        nullable: true,
        length: 250,
        default: "",
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "modification", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "itemType",
        default: "FOOD",
        length: 50
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "itemType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "avgpreptime",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "avgpreptime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "preptimedifference",
        nullable: true,
        length: 14
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "preptimedifference", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "item_price",
        nullable: true,
        length: 25
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "itemPrice", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "category",
        nullable: true,
        length: 100
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "voidat",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "voidat", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "voidtotaltime",
        nullable: true,
        length: 20
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "voidtotaltime", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "ordertracker_id",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "ordertrackerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "description",
        nullable: true,
        length: 200
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "is_taxable",
        nullable: true,
        width: 1
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "isTaxable", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "productID",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "unit",
        nullable: true,
        length: 15,
        default: null,
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "itemID",
        nullable: true
    }),
    __metadata("design:type", Object)
], user_Tblordertrackerdetails.prototype, "itemID", void 0);
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
], user_Tblordertrackerdetails.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_Tblordertracker_1.user_Tblordertracker, user_tblordertrackerdetails => user_tblordertrackerdetails.user_tblordertrackerdetails, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "ordertracker_id",
            referencedColumnName: "id"
        }
    ]),
    __metadata("design:type", user_Tblordertracker_1.user_Tblordertracker)
], user_Tblordertrackerdetails.prototype, "ordertracker", void 0);
user_Tblordertrackerdetails = __decorate([
    (0, typeorm_1.Index)("tblordert_ordertracker_id_b772ac4fewfwefwefb_fk_quickstar", ["ordertrackerId"], {}),
    (0, typeorm_1.Entity)()
], user_Tblordertrackerdetails);
exports.user_Tblordertrackerdetails = user_Tblordertrackerdetails;
