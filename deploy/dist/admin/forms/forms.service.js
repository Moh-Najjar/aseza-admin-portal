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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Forms_1 = require("../../entities/Forms");
const FormFields_1 = require("../../entities/FormFields");
const form_field_mapper_1 = require("./mappers/form-field.mapper");
let FormsService = class FormsService {
    formsRepo;
    fieldsRepo;
    constructor(formsRepo, fieldsRepo) {
        this.formsRepo = formsRepo;
        this.fieldsRepo = fieldsRepo;
    }
    async create(dto, admin) {
        const duplicate = await this.formsRepo.findOne({
            where: { formKey: dto.formKey },
        });
        if (duplicate) {
            throw new common_1.ConflictException(`A form with formKey "${dto.formKey}" already exists`);
        }
        const form = this.formsRepo.create({
            formKey: dto.formKey,
            nameEn: dto.nameEn,
            nameAr: dto.nameAr,
            descriptionEn: dto.descriptionEn ?? null,
            descriptionAr: dto.descriptionAr ?? null,
            isActive: dto.isActive ?? true,
            directorateId: dto.directorateId ?? null,
            frequencyId: dto.frequencyId ?? null,
            effectiveFrom: dto.effectiveFrom ? new Date(dto.effectiveFrom) : null,
            effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : null,
            createdByUserId: admin.userId > 0 ? admin.userId : null,
        });
        return this.formsRepo.save(form);
    }
    async findOne(formId) {
        const form = await this.formsRepo.findOne({
            where: { formId },
            relations: {
                directorate: true,
                frequency: true,
                formFields: form_field_mapper_1.FIELD_RESPONSE_RELATIONS,
            },
        });
        if (!form) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
        return {
            ...form,
            formFields: form.formFields.map(form_field_mapper_1.mapFormFieldToResponse),
        };
    }
    async findAll() {
        return this.formsRepo.find({
            relations: { directorate: true, frequency: true },
            order: { formId: 'ASC' },
        });
    }
    async update(formId, dto, admin) {
        const form = await this.formsRepo.findOne({ where: { formId } });
        if (!form) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
        if (dto.nameEn !== undefined)
            form.nameEn = dto.nameEn;
        if (dto.nameAr !== undefined)
            form.nameAr = dto.nameAr;
        if (dto.descriptionEn !== undefined)
            form.descriptionEn = dto.descriptionEn;
        if (dto.descriptionAr !== undefined)
            form.descriptionAr = dto.descriptionAr;
        if (dto.isActive !== undefined)
            form.isActive = dto.isActive;
        if (dto.directorateId !== undefined)
            form.directorateId = dto.directorateId;
        if (dto.frequencyId !== undefined)
            form.frequencyId = dto.frequencyId;
        if (dto.effectiveFrom !== undefined) {
            form.effectiveFrom = dto.effectiveFrom
                ? new Date(dto.effectiveFrom)
                : null;
        }
        if (dto.effectiveTo !== undefined) {
            form.effectiveTo = dto.effectiveTo ? new Date(dto.effectiveTo) : null;
        }
        form.updatedAt = new Date();
        form.updatedByUserId = admin.userId > 0 ? admin.userId : null;
        return this.formsRepo.save(form);
    }
    async deactivate(formId) {
        const form = await this.formsRepo.findOne({ where: { formId } });
        if (!form) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
        form.isActive = false;
        return this.formsRepo.save(form);
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Forms_1.Forms)),
    __param(1, (0, typeorm_1.InjectRepository)(FormFields_1.FormFields)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FormsService);
//# sourceMappingURL=forms.service.js.map