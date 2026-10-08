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
exports.FormSubmissionTableValues = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const FormFields_1 = require("./FormFields");
let FormSubmissionTableValues = class FormSubmissionTableValues {
    id;
    rowIndex;
    columnKey;
    valueString;
    valueNumber;
    valueDate;
    createdAt;
    submission;
    field;
};
exports.FormSubmissionTableValues = FormSubmissionTableValues;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'Id' }),
    __metadata("design:type", String)
], FormSubmissionTableValues.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'RowIndex' }),
    __metadata("design:type", Number)
], FormSubmissionTableValues.prototype, "rowIndex", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ColumnKey', length: 100 }),
    __metadata("design:type", String)
], FormSubmissionTableValues.prototype, "columnKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ValueString', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionTableValues.prototype, "valueString", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'ValueNumber',
        nullable: true,
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", Object)
], FormSubmissionTableValues.prototype, "valueNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ValueDate', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissionTableValues.prototype, "valueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormSubmissionTableValues.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.formSubmissionTableValues),
    (0, typeorm_1.JoinColumn)([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }]),
    __metadata("design:type", FormSubmissions_1.FormSubmissions)
], FormSubmissionTableValues.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formSubmissionTableValues),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormSubmissionTableValues.prototype, "field", void 0);
exports.FormSubmissionTableValues = FormSubmissionTableValues = __decorate([
    (0, typeorm_1.Index)('PK__FormSubm__3214EC07D4F5CEAD', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('FormSubmissionTableValues', { schema: 'dbo' })
], FormSubmissionTableValues);
//# sourceMappingURL=FormSubmissionTableValues.js.map