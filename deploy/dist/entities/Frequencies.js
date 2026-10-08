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
exports.Frequencies = void 0;
const typeorm_1 = require("typeorm");
const Forms_1 = require("./Forms");
const KpiDefinitions_1 = require("./KpiDefinitions");
const KpiSubmissionPeriods_1 = require("./KpiSubmissionPeriods");
let Frequencies = class Frequencies {
    frequencyId;
    code;
    nameEn;
    nameAr;
    description;
    isActive;
    createdAt;
    forms;
    kpiDefinitions;
    kpiSubmissionPeriods;
};
exports.Frequencies = Frequencies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'FrequencyId' }),
    __metadata("design:type", Number)
], Frequencies.prototype, "frequencyId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Code', unique: true, length: 50 }),
    __metadata("design:type", String)
], Frequencies.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 100 }),
    __metadata("design:type", String)
], Frequencies.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 100 }),
    __metadata("design:type", String)
], Frequencies.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Description', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], Frequencies.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], Frequencies.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], Frequencies.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Forms_1.Forms, (forms) => forms.frequency),
    __metadata("design:type", Array)
], Frequencies.prototype, "forms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.frequency),
    __metadata("design:type", Array)
], Frequencies.prototype, "kpiDefinitions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiSubmissionPeriods_1.KpiSubmissionPeriods, (kpiSubmissionPeriods) => kpiSubmissionPeriods.frequency),
    __metadata("design:type", Array)
], Frequencies.prototype, "kpiSubmissionPeriods", void 0);
exports.Frequencies = Frequencies = __decorate([
    (0, typeorm_1.Index)('PK__Frequenc__59247498621A3156', ['frequencyId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__Frequenc__A25C5AA7C53554EA', ['code'], { unique: true }),
    (0, typeorm_1.Entity)('Frequencies', { schema: 'dbo' })
], Frequencies);
//# sourceMappingURL=Frequencies.js.map