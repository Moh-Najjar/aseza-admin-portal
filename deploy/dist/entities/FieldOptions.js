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
exports.FieldOptions = void 0;
const typeorm_1 = require("typeorm");
const FormFields_1 = require("./FormFields");
let FieldOptions = class FieldOptions {
    optionId;
    fieldId;
    optionKey;
    optionLabelEn;
    optionLabelAr;
    optionValue;
    displayOrder;
    isActive;
    createdAt;
    field;
};
exports.FieldOptions = FieldOptions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'OptionId' }),
    __metadata("design:type", Number)
], FieldOptions.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId', unique: true }),
    __metadata("design:type", Number)
], FieldOptions.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'OptionKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], FieldOptions.prototype, "optionKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'OptionLabelEn', length: 200 }),
    __metadata("design:type", String)
], FieldOptions.prototype, "optionLabelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'OptionLabelAr', length: 200 }),
    __metadata("design:type", String)
], FieldOptions.prototype, "optionLabelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'OptionValue', length: 100 }),
    __metadata("design:type", String)
], FieldOptions.prototype, "optionValue", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DisplayOrder' }),
    __metadata("design:type", Number)
], FieldOptions.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FieldOptions.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FieldOptions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.fieldOptions),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FieldOptions.prototype, "field", void 0);
exports.FieldOptions = FieldOptions = __decorate([
    (0, typeorm_1.Index)('PK__FieldOpt__92C7A1FF2765A8C2', ['optionId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_FieldOptions_Field_OptionKey', ['fieldId', 'optionKey'], {
        unique: true,
    }),
    (0, typeorm_1.Entity)('FieldOptions', { schema: 'dbo' })
], FieldOptions);
//# sourceMappingURL=FieldOptions.js.map