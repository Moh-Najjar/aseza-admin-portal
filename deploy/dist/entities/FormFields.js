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
exports.FormFields = void 0;
const typeorm_1 = require("typeorm");
const FieldDependencies_1 = require("./FieldDependencies");
const FieldOptions_1 = require("./FieldOptions");
const FormFieldCalculations_1 = require("./FormFieldCalculations");
const FormFieldColumns_1 = require("./FormFieldColumns");
const FormFieldRows_1 = require("./FormFieldRows");
const Forms_1 = require("./Forms");
const DataTypes_1 = require("./DataTypes");
const ControlTypes_1 = require("./ControlTypes");
const LookupTypes_1 = require("./LookupTypes");
const KpiDefinitions_1 = require("./KpiDefinitions");
const FormSubmissionMultiValues_1 = require("./FormSubmissionMultiValues");
const FormSubmissionTableValues_1 = require("./FormSubmissionTableValues");
const FormSubmissionValues_1 = require("./FormSubmissionValues");
let FormFields = class FormFields {
    fieldId;
    formId;
    fieldKey;
    labelEn;
    labelAr;
    isRequired;
    minValue;
    maxValue;
    minLength;
    maxLength;
    regexPattern;
    placeholderEn;
    placeholderAr;
    defaultValue;
    displayOrder;
    helpTextEn;
    helpTextAr;
    isReadOnly;
    isVisible;
    validationMessageEn;
    validationMessageAr;
    createdAt;
    dataTypeId;
    controlTypeId;
    lookupTypeId;
    kpiId;
    fieldDependencies;
    fieldDependencies2;
    fieldOptions;
    formFieldCalculations;
    formFieldColumns;
    formFieldRows;
    form;
    dataType;
    controlType;
    lookupType;
    kpi;
    formSubmissionMultiValues;
    formSubmissionTableValues;
    formSubmissionValues;
};
exports.FormFields = FormFields;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'FieldId' }),
    __metadata("design:type", Number)
], FormFields.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FormId', unique: true }),
    __metadata("design:type", Number)
], FormFields.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FieldKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], FormFields.prototype, "fieldKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelEn', length: 200 }),
    __metadata("design:type", String)
], FormFields.prototype, "labelEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'LabelAr', length: 200 }),
    __metadata("design:type", String)
], FormFields.prototype, "labelAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsRequired', default: () => '(0)' }),
    __metadata("design:type", Boolean)
], FormFields.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'MinValue',
        nullable: true,
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", Object)
], FormFields.prototype, "minValue", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'MaxValue',
        nullable: true,
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", Object)
], FormFields.prototype, "maxValue", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'MinLength', nullable: true }),
    __metadata("design:type", Object)
], FormFields.prototype, "minLength", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'MaxLength', nullable: true }),
    __metadata("design:type", Object)
], FormFields.prototype, "maxLength", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RegexPattern', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFields.prototype, "regexPattern", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], FormFields.prototype, "placeholderEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], FormFields.prototype, "placeholderAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DefaultValue', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFields.prototype, "defaultValue", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DisplayOrder' }),
    __metadata("design:type", Number)
], FormFields.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFields.prototype, "helpTextEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], FormFields.prototype, "helpTextAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsReadOnly', default: () => '(0)' }),
    __metadata("design:type", Boolean)
], FormFields.prototype, "isReadOnly", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsVisible', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], FormFields.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageEn',
        nullable: true,
        length: 300,
    }),
    __metadata("design:type", Object)
], FormFields.prototype, "validationMessageEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ValidationMessageAr',
        nullable: true,
        length: 300,
    }),
    __metadata("design:type", Object)
], FormFields.prototype, "validationMessageAr", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormFields.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DataTypeId' }),
    __metadata("design:type", Number)
], FormFields.prototype, "dataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'ControlTypeId' }),
    __metadata("design:type", Number)
], FormFields.prototype, "controlTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'LookupTypeId', nullable: true }),
    __metadata("design:type", Object)
], FormFields.prototype, "lookupTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'KpiId', nullable: true }),
    __metadata("design:type", Object)
], FormFields.prototype, "kpiId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FieldDependencies_1.FieldDependencies, (fieldDependencies) => fieldDependencies.field),
    __metadata("design:type", Array)
], FormFields.prototype, "fieldDependencies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FieldDependencies_1.FieldDependencies, (fieldDependencies) => fieldDependencies.dependsOnField),
    __metadata("design:type", Array)
], FormFields.prototype, "fieldDependencies2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FieldOptions_1.FieldOptions, (fieldOptions) => fieldOptions.field),
    __metadata("design:type", Array)
], FormFields.prototype, "fieldOptions", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => FormFieldCalculations_1.FormFieldCalculations, (formFieldCalculations) => formFieldCalculations.field),
    __metadata("design:type", FormFieldCalculations_1.FormFieldCalculations)
], FormFields.prototype, "formFieldCalculations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldColumns_1.FormFieldColumns, (formFieldColumns) => formFieldColumns.field),
    __metadata("design:type", Array)
], FormFields.prototype, "formFieldColumns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldRows_1.FormFieldRows, (formFieldRows) => formFieldRows.field),
    __metadata("design:type", Array)
], FormFields.prototype, "formFieldRows", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Forms_1.Forms, (forms) => forms.formFields),
    (0, typeorm_1.JoinColumn)([{ name: 'FormId', referencedColumnName: 'formId' }]),
    __metadata("design:type", Forms_1.Forms)
], FormFields.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DataTypes_1.DataTypes, (dataTypes) => dataTypes.formFields),
    (0, typeorm_1.JoinColumn)([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }]),
    __metadata("design:type", DataTypes_1.DataTypes)
], FormFields.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ControlTypes_1.ControlTypes, (controlTypes) => controlTypes.formFields),
    (0, typeorm_1.JoinColumn)([
        { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
    ]),
    __metadata("design:type", ControlTypes_1.ControlTypes)
], FormFields.prototype, "controlType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LookupTypes_1.LookupTypes, (lookupTypes) => lookupTypes.formFields),
    (0, typeorm_1.JoinColumn)([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }]),
    __metadata("design:type", LookupTypes_1.LookupTypes)
], FormFields.prototype, "lookupType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.formFields),
    (0, typeorm_1.JoinColumn)([{ name: 'KpiId', referencedColumnName: 'kpiId' }]),
    __metadata("design:type", KpiDefinitions_1.KpiDefinitions)
], FormFields.prototype, "kpi", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionMultiValues_1.FormSubmissionMultiValues, (formSubmissionMultiValues) => formSubmissionMultiValues.field),
    __metadata("design:type", Array)
], FormFields.prototype, "formSubmissionMultiValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionTableValues_1.FormSubmissionTableValues, (formSubmissionTableValues) => formSubmissionTableValues.field),
    __metadata("design:type", Array)
], FormFields.prototype, "formSubmissionTableValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionValues_1.FormSubmissionValues, (formSubmissionValues) => formSubmissionValues.field),
    __metadata("design:type", Array)
], FormFields.prototype, "formSubmissionValues", void 0);
exports.FormFields = FormFields = __decorate([
    (0, typeorm_1.Index)('PK__FormFiel__C8B6FF074E59B510', ['fieldId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_FormFields_Form_FieldKey', ['formId', 'fieldKey'], { unique: true }),
    (0, typeorm_1.Entity)('FormFields', { schema: 'dbo' })
], FormFields);
//# sourceMappingURL=FormFields.js.map