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
exports.FormSubmissionMultiValues = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const FormFields_1 = require("./FormFields");
const LookupValues_1 = require("./LookupValues");
let FormSubmissionMultiValues = class FormSubmissionMultiValues {
    id;
    createdAt;
    submission;
    field;
    lookupValue;
};
exports.FormSubmissionMultiValues = FormSubmissionMultiValues;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'Id' }),
    __metadata("design:type", String)
], FormSubmissionMultiValues.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormSubmissionMultiValues.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.formSubmissionMultiValues),
    (0, typeorm_1.JoinColumn)([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }]),
    __metadata("design:type", FormSubmissions_1.FormSubmissions)
], FormSubmissionMultiValues.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.formSubmissionMultiValues),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FormSubmissionMultiValues.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LookupValues_1.LookupValues, (lookupValues) => lookupValues.formSubmissionMultiValues),
    (0, typeorm_1.JoinColumn)([
        { name: 'LookupValueId', referencedColumnName: 'lookupValueId' },
    ]),
    __metadata("design:type", LookupValues_1.LookupValues)
], FormSubmissionMultiValues.prototype, "lookupValue", void 0);
exports.FormSubmissionMultiValues = FormSubmissionMultiValues = __decorate([
    (0, typeorm_1.Index)('PK__FormSubm__3214EC073BE0FD4B', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('FormSubmissionMultiValues', { schema: 'dbo' })
], FormSubmissionMultiValues);
//# sourceMappingURL=FormSubmissionMultiValues.js.map