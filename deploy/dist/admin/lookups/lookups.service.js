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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ControlTypes_1 = require("../../entities/ControlTypes");
const DataTypes_1 = require("../../entities/DataTypes");
const LookupTypes_1 = require("../../entities/LookupTypes");
const LookupValues_1 = require("../../entities/LookupValues");
const Frequencies_1 = require("../../entities/Frequencies");
const frequency_periods_1 = require("../../common/frequency/frequency-periods");
let LookupsService = class LookupsService {
    controlTypesRepo;
    dataTypesRepo;
    lookupTypesRepo;
    lookupValuesRepo;
    frequenciesRepo;
    constructor(controlTypesRepo, dataTypesRepo, lookupTypesRepo, lookupValuesRepo, frequenciesRepo) {
        this.controlTypesRepo = controlTypesRepo;
        this.dataTypesRepo = dataTypesRepo;
        this.lookupTypesRepo = lookupTypesRepo;
        this.lookupValuesRepo = lookupValuesRepo;
        this.frequenciesRepo = frequenciesRepo;
    }
    findControlTypes() {
        return this.controlTypesRepo.find({
            where: { isActive: true },
            order: { controlTypeId: 'ASC' },
        });
    }
    findDataTypes() {
        return this.dataTypesRepo.find({
            where: { isActive: true },
            order: { dataTypeId: 'ASC' },
        });
    }
    findLookupTypes() {
        return this.lookupTypesRepo.find({
            where: { isActive: true },
            order: { lookupTypeId: 'ASC' },
        });
    }
    findLookupValues(lookupTypeId) {
        return this.lookupValuesRepo.find({
            where: { lookupType: { lookupTypeId }, isActive: true },
            order: { lookupValueId: 'ASC' },
        });
    }
    async findFrequencies() {
        const rows = await this.frequenciesRepo.find({
            where: { isActive: true },
            order: { frequencyId: 'ASC' },
        });
        return rows.map((row) => this.toFrequencyLookup(row));
    }
    async findFrequencyPeriods(frequencyId, query) {
        const frequency = await this.frequenciesRepo.findOne({
            where: { frequencyId, isActive: true },
        });
        if (!frequency) {
            throw new common_1.NotFoundException(`Frequency with id ${frequencyId} not found`);
        }
        const year = query.year ?? new Date().getUTCFullYear();
        let anchor;
        if (query.periodStartDate !== undefined) {
            const parsed = (0, frequency_periods_1.parsePeriodStartDate)(query.periodStartDate);
            if (!parsed) {
                throw new common_1.BadRequestException(`Invalid periodStartDate "${query.periodStartDate}". Use a real calendar date (YYYY-MM-DD).`);
            }
            if (!(parsed.month === 1 && parsed.day === 1) &&
                !(0, frequency_periods_1.supportsCustomPeriodStart)(frequency.code)) {
                throw new common_1.BadRequestException(`Frequency ${frequency.code} does not support a custom period start date`);
            }
            anchor = parsed;
        }
        return {
            frequency: this.toFrequencySummary(frequency),
            expectedPeriods: (0, frequency_periods_1.generateExpectedPeriods)(frequency.code, {
                year,
                month: query.month,
                anchor,
            }),
        };
    }
    toFrequencyLookup(row) {
        return {
            ...this.toFrequencySummary(row),
            isActive: row.isActive,
            createdAt: row.createdAt,
        };
    }
    toFrequencySummary(row) {
        return {
            frequencyId: row.frequencyId,
            code: row.code,
            nameEn: row.nameEn,
            nameAr: row.nameAr,
            description: row.description,
            hasDiscretePeriods: (0, frequency_periods_1.hasDiscretePeriods)(row.code),
            supportsCustomPeriodStart: (0, frequency_periods_1.supportsCustomPeriodStart)(row.code),
        };
    }
};
exports.LookupsService = LookupsService;
exports.LookupsService = LookupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ControlTypes_1.ControlTypes)),
    __param(1, (0, typeorm_1.InjectRepository)(DataTypes_1.DataTypes)),
    __param(2, (0, typeorm_1.InjectRepository)(LookupTypes_1.LookupTypes)),
    __param(3, (0, typeorm_1.InjectRepository)(LookupValues_1.LookupValues)),
    __param(4, (0, typeorm_1.InjectRepository)(Frequencies_1.Frequencies)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LookupsService);
//# sourceMappingURL=lookups.service.js.map