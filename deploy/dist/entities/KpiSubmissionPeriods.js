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
exports.KpiSubmissionPeriods = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const KpiDefinitions_1 = require("./KpiDefinitions");
const Frequencies_1 = require("./Frequencies");
let KpiSubmissionPeriods = class KpiSubmissionPeriods {
    kpiSubmissionPeriodId;
    submissionId;
    directorateId;
    kpiId;
    frequencyId;
    periodStartDate;
    submissionStatus;
    createdAt;
    submission;
    kpi;
    frequency;
};
exports.KpiSubmissionPeriods = KpiSubmissionPeriods;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'KpiSubmissionPeriodId' }),
    __metadata("design:type", String)
], KpiSubmissionPeriods.prototype, "kpiSubmissionPeriodId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'SubmissionId' }),
    __metadata("design:type", String)
], KpiSubmissionPeriods.prototype, "submissionId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DirectorateId' }),
    __metadata("design:type", Number)
], KpiSubmissionPeriods.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'KpiId' }),
    __metadata("design:type", Number)
], KpiSubmissionPeriods.prototype, "kpiId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FrequencyId' }),
    __metadata("design:type", Number)
], KpiSubmissionPeriods.prototype, "frequencyId", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'PeriodStartDate' }),
    __metadata("design:type", Date)
], KpiSubmissionPeriods.prototype, "periodStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'SubmissionStatus', length: 50 }),
    __metadata("design:type", String)
], KpiSubmissionPeriods.prototype, "submissionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], KpiSubmissionPeriods.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.kpiSubmissionPeriods),
    (0, typeorm_1.JoinColumn)([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }]),
    __metadata("design:type", FormSubmissions_1.FormSubmissions)
], KpiSubmissionPeriods.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.kpiSubmissionPeriods),
    (0, typeorm_1.JoinColumn)([{ name: 'KpiId', referencedColumnName: 'kpiId' }]),
    __metadata("design:type", KpiDefinitions_1.KpiDefinitions)
], KpiSubmissionPeriods.prototype, "kpi", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Frequencies_1.Frequencies, (frequencies) => frequencies.kpiSubmissionPeriods),
    (0, typeorm_1.JoinColumn)([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }]),
    __metadata("design:type", Frequencies_1.Frequencies)
], KpiSubmissionPeriods.prototype, "frequency", void 0);
exports.KpiSubmissionPeriods = KpiSubmissionPeriods = __decorate([
    (0, typeorm_1.Index)('IX_Ksp_Kpi_PeriodStart', ['kpiId', 'periodStartDate'], {}),
    (0, typeorm_1.Index)('IX_Ksp_SubmissionId', ['submissionId'], {}),
    (0, typeorm_1.Index)('PK_KpiSubmissionPeriods', ['kpiSubmissionPeriodId'], { unique: true }),
    (0, typeorm_1.Index)('UX_Ksp_Blocking', ['directorateId', 'kpiId', 'frequencyId', 'periodStartDate'], { unique: true }),
    (0, typeorm_1.Entity)('KpiSubmissionPeriods', { schema: 'dbo' })
], KpiSubmissionPeriods);
//# sourceMappingURL=KpiSubmissionPeriods.js.map