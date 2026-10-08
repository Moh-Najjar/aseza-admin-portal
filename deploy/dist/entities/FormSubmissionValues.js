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
exports.FormSubmissionValues = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const FormFields_1 = require("./FormFields");
let FormSubmissionValues = class FormSubmissionValues {
    submissionValueId;
    submissionId;
    fieldId;
    fieldKey;
    valueString;
    valueNumber;
    valueDecimal;
    valueDate;
    valueBoolean;
    valueJson;
    createdAt;
    submission;
    field;
};
exports.FormSubmissionValues = FormSubmissionValues;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'SubmissionValueId' }),
    __metadata("design:type", String)
], FormSubmissionValues.prototype, "submissionValueId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'SubmissionId', unique: true }),
    __metadata("design:type", String)
], FormSubmissionValues.prototype, "submissionId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId', unique: true }),
    __metadata("design:type", Number)
], FormSubmissionValues.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FieldKey', length: 100 }),
    __metadata("design:type", String)
], FormSubmissionValues.prototype, "fieldKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ValueString', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueString", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'ValueNumber', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'ValueDecimal',
        nullable: true,
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueDecimal", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ValueDate', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'ValueBoolean', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueBoolean", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ValueJson', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionValues.prototype, "valueJson", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormSubmissionValues.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.formSubmissionValues),
    (0, typeorm_1.JoinColumn)([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }]),
    __metadata("design:type", FormSubmissions_1.FormSubmissions)
], FormSubmissionValues.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formSubmissionValues),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormSubmissionValues.prototype, "field", void 0);
exports.FormSubmissionValues = FormSubmissionValues = __decorate([
    (0, typeorm_1.Index)('PK__FormSubm__BCB0EDAC0139CFD3', ['submissionValueId'], {
        unique: true,
    }),
    (0, typeorm_1.Index)('UQ_SubValues_Sub_Field', ['submissionId', 'fieldId'], { unique: true }),
    (0, typeorm_1.Entity)('FormSubmissionValues', { schema: 'dbo' })
], FormSubmissionValues);
//# sourceMappingURL=FormSubmissionValues.js.map