"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tblordertrackerdetails = void 0;
var typeorm_1 = require("typeorm");
var Tblordertracker_1 = require("./Tblordertracker");
var Tblordertrackerdetails = exports.Tblordertrackerdetails = function () {
    var _classDecorators = [(0, typeorm_1.Index)("tblordert_ordertracker_id_b772ac4b_fk_quickstar", ["ordertrackerId"], {}), (0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _idtblordertrackerDetails_decorators;
    var _idtblordertrackerDetails_initializers = [];
    var _itemname_decorators;
    var _itemname_initializers = [];
    var _orderedat_decorators;
    var _orderedat_initializers = [];
    var _completedat_decorators;
    var _completedat_initializers = [];
    var _totaltime_decorators;
    var _totaltime_initializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _modification_decorators;
    var _modification_initializers = [];
    var _avgpreptime_decorators;
    var _avgpreptime_initializers = [];
    var _preptimedifference_decorators;
    var _preptimedifference_initializers = [];
    var _itemPrice_decorators;
    var _itemPrice_initializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _voidat_decorators;
    var _voidat_initializers = [];
    var _voidtotaltime_decorators;
    var _voidtotaltime_initializers = [];
    var _ordertrackerId_decorators;
    var _ordertrackerId_initializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _isTaxable_decorators;
    var _isTaxable_initializers = [];
    var _productId_decorators;
    var _productId_initializers = [];
    var _unit_decorators;
    var _unit_initializers = [];
    var _ordertracker_decorators;
    var _ordertracker_initializers = [];
    var Tblordertrackerdetails = _classThis = /** @class */ (function () {
        function Tblordertrackerdetails_1() {
            this.idtblordertrackerDetails = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _idtblordertrackerDetails_initializers, void 0));
            this.itemname = __runInitializers(this, _itemname_initializers, void 0);
            this.orderedat = __runInitializers(this, _orderedat_initializers, void 0);
            this.completedat = __runInitializers(this, _completedat_initializers, void 0);
            this.totaltime = __runInitializers(this, _totaltime_initializers, void 0);
            this.quantity = __runInitializers(this, _quantity_initializers, void 0);
            this.modification = __runInitializers(this, _modification_initializers, void 0);
            this.avgpreptime = __runInitializers(this, _avgpreptime_initializers, void 0);
            this.preptimedifference = __runInitializers(this, _preptimedifference_initializers, void 0);
            this.itemPrice = __runInitializers(this, _itemPrice_initializers, void 0);
            this.category = __runInitializers(this, _category_initializers, void 0);
            this.voidat = __runInitializers(this, _voidat_initializers, void 0);
            this.voidtotaltime = __runInitializers(this, _voidtotaltime_initializers, void 0);
            this.ordertrackerId = __runInitializers(this, _ordertrackerId_initializers, void 0);
            this.description = __runInitializers(this, _description_initializers, void 0);
            this.isTaxable = __runInitializers(this, _isTaxable_initializers, void 0);
            this.productId = __runInitializers(this, _productId_initializers, void 0);
            this.unit = __runInitializers(this, _unit_initializers, void 0);
            this.ordertracker = __runInitializers(this, _ordertracker_initializers, void 0);
        }
        return Tblordertrackerdetails_1;
    }());
    __setFunctionName(_classThis, "Tblordertrackerdetails");
    (function () {
        _idtblordertrackerDetails_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "idtblordertracker_details" })];
        _itemname_decorators = [(0, typeorm_1.Column)("varchar", { name: "itemname", nullable: true, length: 100 })];
        _orderedat_decorators = [(0, typeorm_1.Column)("varchar", { name: "orderedat", nullable: true, length: 10 })];
        _completedat_decorators = [(0, typeorm_1.Column)("varchar", { name: "completedat", nullable: true, length: 10 })];
        _totaltime_decorators = [(0, typeorm_1.Column)("varchar", { name: "totaltime", nullable: true, length: 10 })];
        _quantity_decorators = [(0, typeorm_1.Column)("decimal", {
                name: "quantity",
                nullable: true,
                precision: 10,
                scale: 2,
            })];
        _modification_decorators = [(0, typeorm_1.Column)("varchar", { name: "modification", nullable: true, length: 50 })];
        _avgpreptime_decorators = [(0, typeorm_1.Column)("varchar", { name: "avgpreptime", nullable: true, length: 20 })];
        _preptimedifference_decorators = [(0, typeorm_1.Column)("varchar", { name: "preptimedifference", nullable: true, length: 14 })];
        _itemPrice_decorators = [(0, typeorm_1.Column)("varchar", { name: "item_price", nullable: true, length: 10 })];
        _category_decorators = [(0, typeorm_1.Column)("varchar", { name: "category", nullable: true, length: 100 })];
        _voidat_decorators = [(0, typeorm_1.Column)("varchar", { name: "voidat", nullable: true, length: 20 })];
        _voidtotaltime_decorators = [(0, typeorm_1.Column)("varchar", { name: "voidtotaltime", nullable: true, length: 20 })];
        _ordertrackerId_decorators = [(0, typeorm_1.Column)("bigint", { name: "ordertracker_id", nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)("varchar", { name: "description", nullable: true, length: 100 })];
        _isTaxable_decorators = [(0, typeorm_1.Column)("tinyint", { name: "is_taxable", nullable: true, width: 1 })];
        _productId_decorators = [(0, typeorm_1.Column)("int", { name: "productID", nullable: true })];
        _unit_decorators = [(0, typeorm_1.Column)("varchar", { name: "unit", nullable: true, length: 15 })];
        _ordertracker_decorators = [(0, typeorm_1.ManyToOne)(function () { return Tblordertracker_1.Tblordertracker; }, function (tblordertracker) { return tblordertracker.tblordertrackerdetails; }, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }), (0, typeorm_1.JoinColumn)([{ name: "ordertracker_id", referencedColumnName: "id" }])];
        __esDecorate(null, null, _idtblordertrackerDetails_decorators, { kind: "field", name: "idtblordertrackerDetails", static: false, private: false, access: { has: function (obj) { return "idtblordertrackerDetails" in obj; }, get: function (obj) { return obj.idtblordertrackerDetails; }, set: function (obj, value) { obj.idtblordertrackerDetails = value; } } }, _idtblordertrackerDetails_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _itemname_decorators, { kind: "field", name: "itemname", static: false, private: false, access: { has: function (obj) { return "itemname" in obj; }, get: function (obj) { return obj.itemname; }, set: function (obj, value) { obj.itemname = value; } } }, _itemname_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _orderedat_decorators, { kind: "field", name: "orderedat", static: false, private: false, access: { has: function (obj) { return "orderedat" in obj; }, get: function (obj) { return obj.orderedat; }, set: function (obj, value) { obj.orderedat = value; } } }, _orderedat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _completedat_decorators, { kind: "field", name: "completedat", static: false, private: false, access: { has: function (obj) { return "completedat" in obj; }, get: function (obj) { return obj.completedat; }, set: function (obj, value) { obj.completedat = value; } } }, _completedat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _totaltime_decorators, { kind: "field", name: "totaltime", static: false, private: false, access: { has: function (obj) { return "totaltime" in obj; }, get: function (obj) { return obj.totaltime; }, set: function (obj, value) { obj.totaltime = value; } } }, _totaltime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } } }, _quantity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modification_decorators, { kind: "field", name: "modification", static: false, private: false, access: { has: function (obj) { return "modification" in obj; }, get: function (obj) { return obj.modification; }, set: function (obj, value) { obj.modification = value; } } }, _modification_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _avgpreptime_decorators, { kind: "field", name: "avgpreptime", static: false, private: false, access: { has: function (obj) { return "avgpreptime" in obj; }, get: function (obj) { return obj.avgpreptime; }, set: function (obj, value) { obj.avgpreptime = value; } } }, _avgpreptime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _preptimedifference_decorators, { kind: "field", name: "preptimedifference", static: false, private: false, access: { has: function (obj) { return "preptimedifference" in obj; }, get: function (obj) { return obj.preptimedifference; }, set: function (obj, value) { obj.preptimedifference = value; } } }, _preptimedifference_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _itemPrice_decorators, { kind: "field", name: "itemPrice", static: false, private: false, access: { has: function (obj) { return "itemPrice" in obj; }, get: function (obj) { return obj.itemPrice; }, set: function (obj, value) { obj.itemPrice = value; } } }, _itemPrice_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } } }, _category_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _voidat_decorators, { kind: "field", name: "voidat", static: false, private: false, access: { has: function (obj) { return "voidat" in obj; }, get: function (obj) { return obj.voidat; }, set: function (obj, value) { obj.voidat = value; } } }, _voidat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _voidtotaltime_decorators, { kind: "field", name: "voidtotaltime", static: false, private: false, access: { has: function (obj) { return "voidtotaltime" in obj; }, get: function (obj) { return obj.voidtotaltime; }, set: function (obj, value) { obj.voidtotaltime = value; } } }, _voidtotaltime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ordertrackerId_decorators, { kind: "field", name: "ordertrackerId", static: false, private: false, access: { has: function (obj) { return "ordertrackerId" in obj; }, get: function (obj) { return obj.ordertrackerId; }, set: function (obj, value) { obj.ordertrackerId = value; } } }, _ordertrackerId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } } }, _description_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isTaxable_decorators, { kind: "field", name: "isTaxable", static: false, private: false, access: { has: function (obj) { return "isTaxable" in obj; }, get: function (obj) { return obj.isTaxable; }, set: function (obj, value) { obj.isTaxable = value; } } }, _isTaxable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } } }, _productId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _unit_decorators, { kind: "field", name: "unit", static: false, private: false, access: { has: function (obj) { return "unit" in obj; }, get: function (obj) { return obj.unit; }, set: function (obj, value) { obj.unit = value; } } }, _unit_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ordertracker_decorators, { kind: "field", name: "ordertracker", static: false, private: false, access: { has: function (obj) { return "ordertracker" in obj; }, get: function (obj) { return obj.ordertracker; }, set: function (obj, value) { obj.ordertracker = value; } } }, _ordertracker_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Tblordertrackerdetails = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tblordertrackerdetails = _classThis;
}();
