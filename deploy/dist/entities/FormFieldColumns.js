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
exports.FormFieldColumns = void 0;
const typeorm_1 = require("typeorm");
const FormFields_1 = require("./FormFields");
const DataTypes_1 = require("./DataTypes");
const ControlTypes_1 = require("./ControlTypes");
const LookupTypes_1 = require("./LookupTypes");
let FormFieldColumns = class FormFieldColumns {
    columnId;
    columnKey;
    labelEn;
    labelAr;
    displayOrder;
    isRequired;
    fieldId;
    dataTypeId;
    controlTypeId;
    lookupTypeId;
    field;
    dataType;
    controlType;
    lookupType;
};
exports.FormFieldColumns = FormFieldColumns;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'ColumnId' }),
    __metadata("design:type", Number)
], FormFieldColumns.prototype, "columnId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ColumnKey', length: 100 }),
    __metadata("design:type", String)
], FormFieldColumns.prototype, "columnKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelEn', length: 200 }),
    __metadata("design:type", String)
], FormFieldColumns.prototype, "labelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelAr', length: 200 }),
    __metadata("design:type", String)
], FormFieldColumns.prototype, "labelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DisplayOrder', default: () => '(0)' }),
    __metadata("design:type", Number)
], FormFieldColumns.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsRequired', nullable: true }),
    __metadata("design:type", Object)
], FormFieldColumns.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId' }),
    __metadata("design:type", Number)
], FormFieldColumns.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DataTypeId' }),
    __metadata("design:type", Number)
], FormFieldColumns.prototype, "dataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ControlTypeId' }),
    __metadata("design:type", Number)
], FormFieldColumns.prototype, "controlTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'LookupTypeId', nullable: true }),
    __metadata("design:type", Object)
], FormFieldColumns.prototype, "lookupTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formFieldColumns),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormFieldColumns.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DataTypes_1.DataTypes, (dataTypes) => dataTypes.formFieldColumns),
    (0, typeorm_1.JoinColumn)([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }]),
    __metadata("design:type", DataTypes_1.DataTypes)
], FormFieldColumns.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ControlTypes_1.ControlTypes, (controlTypes) => controlTypes.formFieldColumns),
    (0, typeorm_1.JoinColumn)([
        { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
    ]),
    __metadata("design:type", ControlTypes_1.ControlTypes)
], FormFieldColumns.prototype, "controlType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LookupTypes_1.LookupTypes, (lookupTypes) => lookupTypes.formFieldColumns),
    (0, typeorm_1.JoinColumn)([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }]),
    __metadata("design:type", LookupTypes_1.LookupTypes)
], FormFieldColumns.prototype, "lookupType", void 0);
exports.FormFieldColumns = FormFieldColumns = __decorate([
    (0, typeorm_1.Index)('PK__FormFiel__1AA1420FCEAE5CF0', ['columnId'], { unique: true }),
    (0, typeorm_1.Entity)('FormFieldColumns', { schema: 'dbo' })
], FormFieldColumns);
//# sourceMappingURL=FormFieldColumns.js.map