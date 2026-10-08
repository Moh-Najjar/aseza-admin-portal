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
exports.FormFieldCalculations = void 0;
const typeorm_1 = require("typeorm");
const FormFieldCalculationInputs_1 = require("./FormFieldCalculationInputs");
const FormFields_1 = require("./FormFields");
const DataTypes_1 = require("./DataTypes");
const ControlTypes_1 = require("./ControlTypes");
let FormFieldCalculations = class FormFieldCalculations {
    calculationId;
    fieldId;
    formulaExpression;
    resultColumnKey;
    resultLabelEn;
    resultLabelAr;
    resultPrecision;
    buttonLabelEn;
    buttonLabelAr;
    helpTextEn;
    helpTextAr;
    displayFormulaEn;
    displayFormulaAr;
    isActive;
    createdAt;
    resultDataTypeId;
    resultControlTypeId;
    formFieldCalculationInputs;
    field;
    resultDataType;
    resultControlType;
};
exports.FormFieldCalculations = FormFieldCalculations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'CalculationId' }),
    __metadata("design:type", Number)
], FormFieldCalculations.prototype, "calculationId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId', unique: true }),
    __metadata("design:type", Number)
], FormFieldCalculations.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FormulaExpression', length: 500 }),
    __metadata("design:type", String)
], FormFieldCalculations.prototype, "formulaExpression", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ResultColumnKey',
        length: 100,
        default: () => "'RESULT'",
    }),
    __metadata("design:type", String)
], FormFieldCalculations.prototype, "resultColumnKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ResultLabelEn',
        length: 200,
        default: () => "'Result'",
    }),
    __metadata("design:type", String)
], FormFieldCalculations.prototype, "resultLabelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ResultLabelAr',
        length: 200,
        default: () => "N'النتيجة'",
    }),
    __metadata("design:type", String)
], FormFieldCalculations.prototype, "resultLabelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ResultPrecision', default: () => '(2)' }),
    __metadata("design:type", Number)
], FormFieldCalculations.prototype, "resultPrecision", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ButtonLabelEn', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "buttonLabelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ButtonLabelAr', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "buttonLabelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "helpTextEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "helpTextAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DisplayFormulaEn', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "displayFormulaEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DisplayFormulaAr', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldCalculations.prototype, "displayFormulaAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFieldCalculations.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormFieldCalculations.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ResultDataTypeId' }),
    __metadata("design:type", Number)
], FormFieldCalculations.prototype, "resultDataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ResultControlTypeId' }),
    __metadata("design:type", Number)
], FormFieldCalculations.prototype, "resultControlTypeId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldCalculationInputs_1.FormFieldCalculationInputs, (formFieldCalculationInputs) => formFieldCalculationInputs.calculation),
    __metadata("design:type", Array)
], FormFieldCalculations.prototype, "formFieldCalculationInputs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formFieldCalculations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormFieldCalculations.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DataTypes_1.DataTypes, (dataTypes) => dataTypes.formFieldCalculations),
    (0, typeorm_1.JoinColumn)([
        { name: 'ResultDataTypeId', referencedColumnName: 'dataTypeId' },
    ]),
    __metadata("design:type", DataTypes_1.DataTypes)
], FormFieldCalculations.prototype, "resultDataType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ControlTypes_1.ControlTypes, (controlTypes) => controlTypes.formFieldCalculations),
    (0, typeorm_1.JoinColumn)([
        { name: 'ResultControlTypeId', referencedColumnName: 'controlTypeId' },
    ]),
    __metadata("design:type", ControlTypes_1.ControlTypes)
], FormFieldCalculations.prototype, "resultControlType", void 0);
exports.FormFieldCalculations = FormFieldCalculations = __decorate([
    (0, typeorm_1.Index)('PK_FormFieldCalculations', ['calculationId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_FormFieldCalculations_FieldId', ['fieldId'], { unique: true }),
    (0, typeorm_1.Entity)('FormFieldCalculations', { schema: 'dbo' })
], FormFieldCalculations);
//# sourceMappingURL=FormFieldCalculations.js.map