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
exports.KpiDefinitions = void 0;
const typeorm_1 = require("typeorm");
const FormFields_1 = require("./FormFields");
const FormSubmissions_1 = require("./FormSubmissions");
const Directorates_1 = require("./Directorates");
const DataTypes_1 = require("./DataTypes");
const Frequencies_1 = require("./Frequencies");
const KpiSubmissionPeriods_1 = require("./KpiSubmissionPeriods");
let KpiDefinitions = class KpiDefinitions {
    kpiId;
    kpiCode;
    nameEn;
    nameAr;
    targetValue;
    unitEn;
    unitAr;
    themeEn;
    isActive;
    createdAt;
    referenceDate;
    directorateId;
    dataTypeId;
    frequencyId;
    formFields;
    formSubmissions;
    directorate;
    dataType;
    frequency;
    kpiSubmissionPeriods;
};
exports.KpiDefinitions = KpiDefinitions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'KpiId' }),
    __metadata("design:type", Number)
], KpiDefinitions.prototype, "kpiId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'KpiCode', unique: true, length: 50 }),
    __metadata("design:type", String)
], KpiDefinitions.prototype, "kpiCode", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 300 }),
    __metadata("design:type", String)
], KpiDefinitions.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 300 }),
    __metadata("design:type", String)
], KpiDefinitions.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'TargetValue',
        nullable: true,
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "targetValue", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'UnitEn', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "unitEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'UnitAr', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "unitAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ThemeEn', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "themeEn", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], KpiDefinitions.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], KpiDefinitions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'ReferenceDate', nullable: true }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "referenceDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DirectorateId' }),
    __metadata("design:type", Number)
], KpiDefinitions.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DataTypeId' }),
    __metadata("design:type", Number)
], KpiDefinitions.prototype, "dataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FrequencyId', nullable: true }),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "frequencyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFields_1.FormFields, (formFields) => formFields.kpi),
    __metadata("design:type", Array)
], KpiDefinitions.prototype, "formFields", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.kpi),
    __metadata("design:type", Array)
], KpiDefinitions.prototype, "formSubmissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Directorates_1.Directorates, (directorates) => directorates.kpiDefinitions),
    (0, typeorm_1.JoinColumn)([
        { name: 'DirectorateId', referencedColumnName: 'directorateId' },
    ]),
    __metadata("design:type", Directorates_1.Directorates)
], KpiDefinitions.prototype, "directorate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DataTypes_1.DataTypes, (dataTypes) => dataTypes.kpiDefinitions),
    (0, typeorm_1.JoinColumn)([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }]),
    __metadata("design:type", DataTypes_1.DataTypes)
], KpiDefinitions.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Frequencies_1.Frequencies, (frequencies) => frequencies.kpiDefinitions, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }]),
    __metadata("design:type", Object)
], KpiDefinitions.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiSubmissionPeriods_1.KpiSubmissionPeriods, (kpiSubmissionPeriods) => kpiSubmissionPeriods.kpi),
    __metadata("design:type", Array)
], KpiDefinitions.prototype, "kpiSubmissionPeriods", void 0);
exports.KpiDefinitions = KpiDefinitions = __decorate([
    (0, typeorm_1.Index)('PK__KpiDefin__8C69D5BE67C0229B', ['kpiId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__KpiDefin__692F84FBCF934F62', ['kpiCode'], { unique: true }),
    (0, typeorm_1.Entity)('KpiDefinitions', { schema: 'dbo' })
], KpiDefinitions);
//# sourceMappingURL=KpiDefinitions.js.map