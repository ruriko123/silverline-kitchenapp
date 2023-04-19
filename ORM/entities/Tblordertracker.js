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
exports.Tblordertracker = void 0;
var typeorm_1 = require("typeorm");
var Tblordertrackerdetails_1 = require("./Tblordertrackerdetails");
var Tblordertracker = exports.Tblordertracker = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _outletOrderid_decorators;
    var _outletOrderid_initializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _Address_decorators;
    var _Address_initializers = [];
    var _deliveryVia_decorators;
    var _deliveryVia_initializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _tablenum_decorators;
    var _tablenum_initializers = [];
    var _orderedat_decorators;
    var _orderedat_initializers = [];
    var _completedat_decorators;
    var _completedat_initializers = [];
    var _totaltime_decorators;
    var _totaltime_initializers = [];
    var _ordertype_decorators;
    var _ordertype_initializers = [];
    var _currentstate_decorators;
    var _currentstate_initializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _outletName_decorators;
    var _outletName_initializers = [];
    var _employee_decorators;
    var _employee_initializers = [];
    var _guestCount_decorators;
    var _guestCount_initializers = [];
    var _kotid_decorators;
    var _kotid_initializers = [];
    var _tblordertrackerdetails_decorators;
    var _tblordertrackerdetails_initializers = [];
    var Tblordertracker = _classThis = /** @class */ (function () {
        function Tblordertracker_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.outletOrderid = __runInitializers(this, _outletOrderid_initializers, void 0);
            this.customerName = __runInitializers(this, _customerName_initializers, void 0);
            this.customerPhone = __runInitializers(this, _customerPhone_initializers, void 0);
            this.Address = __runInitializers(this, _Address_initializers, void 0);
            this.deliveryVia = __runInitializers(this, _deliveryVia_initializers, void 0);
            this.date = __runInitializers(this, _date_initializers, void 0);
            this.tablenum = __runInitializers(this, _tablenum_initializers, void 0);
            this.orderedat = __runInitializers(this, _orderedat_initializers, void 0);
            this.completedat = __runInitializers(this, _completedat_initializers, void 0);
            this.totaltime = __runInitializers(this, _totaltime_initializers, void 0);
            this.ordertype = __runInitializers(this, _ordertype_initializers, void 0);
            this.currentstate = __runInitializers(this, _currentstate_initializers, void 0);
            this.quantity = __runInitializers(this, _quantity_initializers, void 0);
            this.outletName = __runInitializers(this, _outletName_initializers, void 0);
            this.employee = __runInitializers(this, _employee_initializers, void 0);
            this.guestCount = __runInitializers(this, _guestCount_initializers, void 0);
            this.kotid = __runInitializers(this, _kotid_initializers, void 0);
            this.tblordertrackerdetails = __runInitializers(this, _tblordertrackerdetails_initializers, void 0);
        }
        return Tblordertracker_1;
    }());
    __setFunctionName(_classThis, "Tblordertracker");
    (function () {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id" })];
        _outletOrderid_decorators = [(0, typeorm_1.Column)("int", { name: "outlet_orderid", nullable: true })];
        _customerName_decorators = [(0, typeorm_1.Column)("varchar", { name: "customerName", nullable: true, length: 50 })];
        _customerPhone_decorators = [(0, typeorm_1.Column)("varchar", { name: "customerPhone", nullable: true, length: 20 })];
        _Address_decorators = [(0, typeorm_1.Column)("varchar", { name: "Address", nullable: true, length: 100 })];
        _deliveryVia_decorators = [(0, typeorm_1.Column)("varchar", { name: "deliveryVia", nullable: true, length: 50 })];
        _date_decorators = [(0, typeorm_1.Column)("date", { name: "date", nullable: true })];
        _tablenum_decorators = [(0, typeorm_1.Column)("varchar", { name: "tablenum", nullable: true, length: 10 })];
        _orderedat_decorators = [(0, typeorm_1.Column)("varchar", { name: "orderedat", nullable: true, length: 10 })];
        _completedat_decorators = [(0, typeorm_1.Column)("varchar", { name: "completedat", nullable: true, length: 10 })];
        _totaltime_decorators = [(0, typeorm_1.Column)("varchar", { name: "totaltime", nullable: true, length: 10 })];
        _ordertype_decorators = [(0, typeorm_1.Column)("varchar", { name: "ordertype", nullable: true, length: 20 })];
        _currentstate_decorators = [(0, typeorm_1.Column)("varchar", { name: "currentstate", nullable: true, length: 20 })];
        _quantity_decorators = [(0, typeorm_1.Column)("decimal", {
                name: "quantity",
                nullable: true,
                precision: 10,
                scale: 2,
            })];
        _outletName_decorators = [(0, typeorm_1.Column)("varchar", { name: "outlet_name", nullable: true, length: 50 })];
        _employee_decorators = [(0, typeorm_1.Column)("varchar", { name: "employee", nullable: true, length: 50 })];
        _guestCount_decorators = [(0, typeorm_1.Column)("int", { name: "guest_count", nullable: true })];
        _kotid_decorators = [(0, typeorm_1.Column)("varchar", { name: "kotid", nullable: true, length: 20 })];
        _tblordertrackerdetails_decorators = [(0, typeorm_1.OneToMany)(function () { return Tblordertrackerdetails_1.Tblordertrackerdetails; }, function (tblordertrackerdetails) { return tblordertrackerdetails.ordertracker; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _outletOrderid_decorators, { kind: "field", name: "outletOrderid", static: false, private: false, access: { has: function (obj) { return "outletOrderid" in obj; }, get: function (obj) { return obj.outletOrderid; }, set: function (obj, value) { obj.outletOrderid = value; } } }, _outletOrderid_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } } }, _customerName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } } }, _customerPhone_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Address_decorators, { kind: "field", name: "Address", static: false, private: false, access: { has: function (obj) { return "Address" in obj; }, get: function (obj) { return obj.Address; }, set: function (obj, value) { obj.Address = value; } } }, _Address_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _deliveryVia_decorators, { kind: "field", name: "deliveryVia", static: false, private: false, access: { has: function (obj) { return "deliveryVia" in obj; }, get: function (obj) { return obj.deliveryVia; }, set: function (obj, value) { obj.deliveryVia = value; } } }, _deliveryVia_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } } }, _date_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tablenum_decorators, { kind: "field", name: "tablenum", static: false, private: false, access: { has: function (obj) { return "tablenum" in obj; }, get: function (obj) { return obj.tablenum; }, set: function (obj, value) { obj.tablenum = value; } } }, _tablenum_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _orderedat_decorators, { kind: "field", name: "orderedat", static: false, private: false, access: { has: function (obj) { return "orderedat" in obj; }, get: function (obj) { return obj.orderedat; }, set: function (obj, value) { obj.orderedat = value; } } }, _orderedat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _completedat_decorators, { kind: "field", name: "completedat", static: false, private: false, access: { has: function (obj) { return "completedat" in obj; }, get: function (obj) { return obj.completedat; }, set: function (obj, value) { obj.completedat = value; } } }, _completedat_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _totaltime_decorators, { kind: "field", name: "totaltime", static: false, private: false, access: { has: function (obj) { return "totaltime" in obj; }, get: function (obj) { return obj.totaltime; }, set: function (obj, value) { obj.totaltime = value; } } }, _totaltime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _ordertype_decorators, { kind: "field", name: "ordertype", static: false, private: false, access: { has: function (obj) { return "ordertype" in obj; }, get: function (obj) { return obj.ordertype; }, set: function (obj, value) { obj.ordertype = value; } } }, _ordertype_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _currentstate_decorators, { kind: "field", name: "currentstate", static: false, private: false, access: { has: function (obj) { return "currentstate" in obj; }, get: function (obj) { return obj.currentstate; }, set: function (obj, value) { obj.currentstate = value; } } }, _currentstate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } } }, _quantity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _outletName_decorators, { kind: "field", name: "outletName", static: false, private: false, access: { has: function (obj) { return "outletName" in obj; }, get: function (obj) { return obj.outletName; }, set: function (obj, value) { obj.outletName = value; } } }, _outletName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _employee_decorators, { kind: "field", name: "employee", static: false, private: false, access: { has: function (obj) { return "employee" in obj; }, get: function (obj) { return obj.employee; }, set: function (obj, value) { obj.employee = value; } } }, _employee_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _guestCount_decorators, { kind: "field", name: "guestCount", static: false, private: false, access: { has: function (obj) { return "guestCount" in obj; }, get: function (obj) { return obj.guestCount; }, set: function (obj, value) { obj.guestCount = value; } } }, _guestCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _kotid_decorators, { kind: "field", name: "kotid", static: false, private: false, access: { has: function (obj) { return "kotid" in obj; }, get: function (obj) { return obj.kotid; }, set: function (obj, value) { obj.kotid = value; } } }, _kotid_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tblordertrackerdetails_decorators, { kind: "field", name: "tblordertrackerdetails", static: false, private: false, access: { has: function (obj) { return "tblordertrackerdetails" in obj; }, get: function (obj) { return obj.tblordertrackerdetails; }, set: function (obj, value) { obj.tblordertrackerdetails = value; } } }, _tblordertrackerdetails_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Tblordertracker = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tblordertracker = _classThis;
}();
