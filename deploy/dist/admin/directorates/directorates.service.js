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
exports.DirectoratesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Directorates_1 = require("../../entities/Directorates");
const Forms_1 = require("../../entities/Forms");
const DirectorateFormAccess_1 = require("../../entities/DirectorateFormAccess");
let DirectoratesService = class DirectoratesService {
    directoratesRepo;
    formsRepo;
    accessRepo;
    constructor(directoratesRepo, formsRepo, accessRepo) {
        this.directoratesRepo = directoratesRepo;
        this.formsRepo = formsRepo;
        this.accessRepo = accessRepo;
    }
    async findAll() {
        return this.directoratesRepo.find({
            order: { directorateId: 'ASC' },
        });
    }
    async getFormAccesses(directorateId) {
        await this.assertDirectorateExists(directorateId);
        return this.accessRepo.find({
            where: { directorateId },
            relations: { form: true },
            order: { accessId: 'ASC' },
        });
    }
    async assignForm(directorateId, dto) {
        await this.assertDirectorateExists(directorateId);
        await this.assertFormExists(dto.formId);
        const existing = await this.accessRepo.findOne({
            where: { directorateId, formId: dto.formId },
        });
        if (existing) {
            existing.canView = dto.canView;
            existing.canSubmit = dto.canSubmit;
            existing.canApprove = dto.canApprove;
            return this.accessRepo.save(existing);
        }
        const newAccess = this.accessRepo.create({
            directorateId,
            formId: dto.formId,
            canView: dto.canView,
            canSubmit: dto.canSubmit,
            canApprove: dto.canApprove,
        });
        return this.accessRepo.save(newAccess);
    }
    async removeFormAccess(directorateId, formId) {
        await this.assertDirectorateExists(directorateId);
        const access = await this.accessRepo.findOne({
            where: { directorateId, formId },
        });
        if (!access) {
            throw new common_1.NotFoundException(`Form ${formId} is not assigned to directorate ${directorateId}`);
        }
        await this.accessRepo.remove(access);
    }
    async findAllActiveForms() {
        return this.formsRepo.find({
            where: { isActive: true },
            order: { formId: 'ASC' },
        });
    }
    async assertDirectorateExists(directorateId) {
        const exists = await this.directoratesRepo.existsBy({ directorateId });
        if (!exists) {
            throw new common_1.NotFoundException(`Directorate with id ${directorateId} not found`);
        }
    }
    async assertFormExists(formId) {
        const exists = await this.formsRepo.existsBy({ formId });
        if (!exists) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
    }
};
exports.DirectoratesService = DirectoratesService;
exports.DirectoratesService = DirectoratesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Directorates_1.Directorates)),
    __param(1, (0, typeorm_1.InjectRepository)(Forms_1.Forms)),
    __param(2, (0, typeorm_1.InjectRepository)(DirectorateFormAccess_1.DirectorateFormAccess)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DirectoratesService);
//# sourceMappingURL=directorates.service.js.map