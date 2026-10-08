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
exports.FormFieldRows = void 0;
const typeorm_1 = require("typeorm");
const FormFields_1 = require("./FormFields");
let FormFieldRows = class FormFieldRows {
    rowId;
    fieldId;
    rowKey;
    labelEn;
    labelAr;
    displayOrder;
    isActive;
    createdAt;
    placeholderEn;
    placeholderAr;
    isRequired;
    isReadOnly;
    isVisible;
    defaultValue;
    helpTextEn;
    helpTextAr;
    validationMessageEn;
    validationMessageAr;
    field;
};
exports.FormFieldRows = FormFieldRows;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'RowId' }),
    __metadata("design:type", Number)
], FormFieldRows.prototype, "rowId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId', unique: true }),
    __metadata("design:type", Number)
], FormFieldRows.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RowKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], FormFieldRows.prototype, "rowKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelEn', length: 300 }),
    __metadata("design:type", String)
], FormFieldRows.prototype, "labelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelAr', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "labelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DisplayOrder', default: () => '(0)' }),
    __metadata("design:type", Number)
], FormFieldRows.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFieldRows.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormFieldRows.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "placeholderEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "placeholderAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsRequired', nullable: true }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsReadOnly', nullable: true }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "isReadOnly", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsVisible', nullable: true }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DefaultValue', nullable: true }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "defaultValue", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "helpTextEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "helpTextAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageEn',
        nullable: true,
        length: 500,
    }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "validationMessageEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageAr',
        nullable: true,
        length: 500,
    }),
    __metadata("design:type", Object)
], FormFieldRows.prototype, "validationMessageAr", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formFieldRows),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormFieldRows.prototype, "field", void 0);
exports.FormFieldRows = FormFieldRows = __decorate([
    (0, typeorm_1.Index)('PK_FormFieldRows', ['rowId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_FormFieldRows_FieldId_RowKey', ['fieldId', 'rowKey'], {
        unique: true,
    }),
    (0, typeorm_1.Entity)('FormFieldRows', { schema: 'dbo' })
], FormFieldRows);
//# sourceMappingURL=FormFieldRows.js.map