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
exports.FormSubmissions = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissionMultiValues_1 = require("./FormSubmissionMultiValues");
const Forms_1 = require("./Forms");
const Users_1 = require("./Users");
const Directorates_1 = require("./Directorates");
const FormVersions_1 = require("./FormVersions");
const KpiDefinitions_1 = require("./KpiDefinitions");
const FormSubmissionTableValues_1 = require("./FormSubmissionTableValues");
const FormSubmissionValues_1 = require("./FormSubmissionValues");
const KpiSubmissionPeriods_1 = require("./KpiSubmissionPeriods");
const SubmissionAuditLogs_1 = require("./SubmissionAuditLogs");
let FormSubmissions = class FormSubmissions {
    submissionId;
    referenceNumber;
    reportingDate;
    submissionStatus;
    enteredAt;
    updatedAt;
    submittedAt;
    approvedAt;
    rejectionReason;
    notes;
    sourceType;
    periodMonth;
    periodYear;
    correlationId;
    exportStatus;
    exportedAt;
    createdAt;
    formSubmissionMultiValues;
    form;
    enteredByUser;
    updatedByUser;
    approvedByUser;
    directorate;
    formVersion;
    kpi;
    formSubmissionTableValues;
    formSubmissionValues;
    kpiSubmissionPeriods;
    submissionAuditLogs;
};
exports.FormSubmissions = FormSubmissions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'SubmissionId' }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "submissionId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ReferenceNumber', unique: true, length: 100 }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ReportingDate' }),
    __metadata("design:type", Date)
], FormSubmissions.prototype, "reportingDate", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'SubmissionStatus',
        length: 50,
        default: () => "'Draft'",
    }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "submissionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'EnteredAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormSubmissions.prototype, "enteredAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'UpdatedAt', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'SubmittedAt', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'ApprovedAt', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RejectionReason', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Notes', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'SourceType',
        length: 50,
        default: () => "'Manual'",
    }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "sourceType", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'PeriodMonth', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "periodMonth", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'PeriodYear', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "periodYear", void 0);
__decorate([
    (0, typeorm_1.Column)('uniqueidentifier', {
        name: 'CorrelationId',
        default: () => 'newid()',
    }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "correlationId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', {
        name: 'ExportStatus',
        length: 50,
        default: () => "'Pending'",
    }),
    __metadata("design:type", String)
], FormSubmissions.prototype, "exportStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'ExportedAt', nullable: true }),
    __metadata("design:type", Object)
], FormSubmissions.prototype, "exportedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormSubmissions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionMultiValues_1.FormSubmissionMultiValues, (formSubmissionMultiValues) => formSubmissionMultiValues.submission),
    __metadata("design:type", Array)
], FormSubmissions.prototype, "formSubmissionMultiValues", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Forms_1.Forms, (forms) => forms.formSubmissions),
    (0, typeorm_1.JoinColumn)([{ name: 'FormId', referencedColumnName: 'formId' }]),
    __metadata("design:type", Forms_1.Forms)
], FormSubmissions.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.formSubmissions),
    (0, typeorm_1.JoinColumn)([{ name: 'EnteredByUserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], FormSubmissions.prototype, "enteredByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.formSubmissions2),
    (0, typeorm_1.JoinColumn)([{ name: 'UpdatedByUserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], FormSubmissions.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.formSubmissions3),
    (0, typeorm_1.JoinColumn)([{ name: 'ApprovedByUserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], FormSubmissions.prototype, "approvedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Directorates_1.Directorates, (directorates) => directorates.formSubmissions),
    (0, typeorm_1.JoinColumn)([
        { name: 'DirectorateId', referencedColumnName: 'directorateId' },
    ]),
    __metadata("design:type", Directorates_1.Directorates)
], FormSubmissions.prototype, "directorate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormVersions_1.FormVersions, (formVersions) => formVersions.formSubmissions),
    (0, typeorm_1.JoinColumn)([
        { name: 'FormVersionId', referencedColumnName: 'formVersionId' },
    ]),
    __metadata("design:type", FormVersions_1.FormVersions)
], FormSubmissions.prototype, "formVersion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.formSubmissions),
    (0, typeorm_1.JoinColumn)([{ name: 'KpiId', referencedColumnName: 'kpiId' }]),
    __metadata("design:type", KpiDefinitions_1.KpiDefinitions)
], FormSubmissions.prototype, "kpi", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionTableValues_1.FormSubmissionTableValues, (formSubmissionTableValues) => formSubmissionTableValues.submission),
    __metadata("design:type", Array)
], FormSubmissions.prototype, "formSubmissionTableValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionValues_1.FormSubmissionValues, (formSubmissionValues) => formSubmissionValues.submission),
    __metadata("design:type", Array)
], FormSubmissions.prototype, "formSubmissionValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiSubmissionPeriods_1.KpiSubmissionPeriods, (kpiSubmissionPeriods) => kpiSubmissionPeriods.submission),
    __metadata("design:type", Array)
], FormSubmissions.prototype, "kpiSubmissionPeriods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SubmissionAuditLogs_1.SubmissionAuditLogs, (submissionAuditLogs) => submissionAuditLogs.submission),
    __metadata("design:type", Array)
], FormSubmissions.prototype, "submissionAuditLogs", void 0);
exports.FormSubmissions = FormSubmissions = __decorate([
    (0, typeorm_1.Index)('IX_Submission_Status', ['submissionStatus'], {}),
    (0, typeorm_1.Index)('PK__FormSubm__449EE1252B0BB089', ['submissionId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__FormSubm__C5ADBE4DDE7A8602', ['referenceNumber'], { unique: true }),
    (0, typeorm_1.Entity)('FormSubmissions', { schema: 'dbo' })
], FormSubmissions);
//# sourceMappingURL=FormSubmissions.js.map