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
exports.ControlTypes = void 0;
const typeorm_1 = require("typeorm");
const FormFieldCalculationInputs_1 = require("./FormFieldCalculationInputs");
const FormFieldCalculations_1 = require("./FormFieldCalculations");
const FormFieldColumns_1 = require("./FormFieldColumns");
const FormFields_1 = require("./FormFields");
let ControlTypes = class ControlTypes {
    controlTypeId;
    controlKey;
    controlName;
    description;
    isActive;
    createdAt;
    formFieldCalculationInputs;
    formFieldCalculations;
    formFieldColumns;
    formFields;
};
exports.ControlTypes = ControlTypes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'ControlTypeId' }),
    __metadata("design:type", Number)
], ControlTypes.prototype, "controlTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ControlKey', unique: true, length: 50 }),
    __metadata("design:type", String)
], ControlTypes.prototype, "controlKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ControlName', length: 100 }),
    __metadata("design:type", String)
], ControlTypes.prototype, "controlName", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Description', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], ControlTypes.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], ControlTypes.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], ControlTypes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldCalculationInputs_1.FormFieldCalculationInputs, (formFieldCalculationInputs) => formFieldCalculationInputs.controlType),
    __metadata("design:type", Array)
], ControlTypes.prototype, "formFieldCalculationInputs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldCalculations_1.FormFieldCalculations, (formFieldCalculations) => formFieldCalculations.resultControlType),
    __metadata("design:type", Array)
], ControlTypes.prototype, "formFieldCalculations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldColumns_1.FormFieldColumns, (formFieldColumns) => formFieldColumns.controlType),
    __metadata("design:type", Array)
], ControlTypes.prototype, "formFieldColumns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFields_1.FormFields, (formFields) => formFields.controlType),
    __metadata("design:type", Array)
], ControlTypes.prototype, "formFields", void 0);
exports.ControlTypes = ControlTypes = __decorate([
    (0, typeorm_1.Index)('PK__ControlT__3399DDEBD0E9A9E5', ['controlTypeId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__ControlT__1C796A64D82DE9B3', ['controlKey'], { unique: true }),
    (0, typeorm_1.Entity)('ControlTypes', { schema: 'dbo' })
], ControlTypes);
//# sourceMappingURL=ControlTypes.js.map