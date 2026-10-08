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
exports.FormFieldCalculationInputs = void 0;
const typeorm_1 = require("typeorm");
const FormFieldCalculations_1 = require("./FormFieldCalculations");
const DataTypes_1 = require("./DataTypes");
const ControlTypes_1 = require("./ControlTypes");
let FormFieldCalculationInputs = class FormFieldCalculationInputs {
    inputId;
    calculationId;
    inputToken;
    columnKey;
    labelEn;
    labelAr;
    placeholderEn;
    placeholderAr;
    displayOrder;
    isRequired;
    isReadOnly;
    isVisible;
    validationMessageEn;
    validationMessageAr;
    isActive;
    createdAt;
    dataTypeId;
    controlTypeId;
    calculation;
    dataType;
    controlType;
};
exports.FormFieldCalculationInputs = FormFieldCalculationInputs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'InputId' }),
    __metadata("design:type", Number)
], FormFieldCalculationInputs.prototype, "inputId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'CalculationId', unique: true }),
    __metadata("design:type", Number)
], FormFieldCalculationInputs.prototype, "calculationId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'InputToken', unique: true, length: 50 }),
    __metadata("design:type", String)
], FormFieldCalculationInputs.prototype, "inputToken", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ColumnKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], FormFieldCalculationInputs.prototype, "columnKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelEn', length: 200 }),
    __metadata("design:type", String)
], FormFieldCalculationInputs.prototype, "labelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelAr', length: 200 }),
    __metadata("design:type", String)
], FormFieldCalculationInputs.prototype, "labelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], FormFieldCalculationInputs.prototype, "placeholderEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], FormFieldCalculationInputs.prototype, "placeholderAr", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DisplayOrder', default: () => '(0)' }),
    __metadata("design:type", Number)
], FormFieldCalculationInputs.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsRequired', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFieldCalculationInputs.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsReadOnly', default: () => '(0)' }),
    __metadata("design:type", Boolean)
], FormFieldCalculationInputs.prototype, "isReadOnly", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsVisible', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFieldCalculationInputs.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageEn',
        nullable: true,
        length: 300,
    }),
    __metadata("design:type", Object)
], FormFieldCalculationInputs.prototype, "validationMessageEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageAr',
        nullable: true,
        length: 300,
    }),
    __metadata("design:type", Object)
], FormFieldCalculationInputs.prototype, "validationMessageAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFieldCalculationInputs.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormFieldCalculationInputs.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DataTypeId' }),
    __metadata("design:type", Number)
], FormFieldCalculationInputs.prototype, "dataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ControlTypeId' }),
    __metadata("design:type", Number)
], FormFieldCalculationInputs.prototype, "controlTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFieldCalculations_1.FormFieldCalculations, (formFieldCalculations) => formFieldCalculations.formFieldCalculationInputs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'CalculationId', referencedColumnName: 'calculationId' },
    ]),
    __metadata("design:type", FormFieldCalculations_1.FormFieldCalculations)
], FormFieldCalculationInputs.prototype, "calculation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DataTypes_1.DataTypes, (dataTypes) => dataTypes.formFieldCalculationInputs),
    (0, typeorm_1.JoinColumn)([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }]),
    __metadata("design:type", DataTypes_1.DataTypes)
], FormFieldCalculationInputs.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ControlTypes_1.ControlTypes, (controlTypes) => controlTypes.formFieldCalculationInputs),
    (0, typeorm_1.JoinColumn)([
        { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
    ]),
    __metadata("design:type", ControlTypes_1.ControlTypes)
], FormFieldCalculationInputs.prototype, "controlType", void 0);
exports.FormFieldCalculationInputs = FormFieldCalculationInputs = __decorate([
    (0, typeorm_1.Index)('PK_FormFieldCalculationInputs', ['inputId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_CalcInputs_CalcId_ColumnKey', ['calculationId', 'columnKey'], {
        unique: true,
    }),
    (0, typeorm_1.Index)('UQ_CalcInputs_CalcId_Token', ['calculationId', 'inputToken'], {
        unique: true,
    }),
    (0, typeorm_1.Entity)('FormFieldCalculationInputs', { schema: 'dbo' })
], FormFieldCalculationInputs);
//# sourceMappingURL=FormFieldCalculationInputs.js.map