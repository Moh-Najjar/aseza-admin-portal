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
exports.FieldsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const FormFields_1 = require("../../entities/FormFields");
const FieldOptions_1 = require("../../entities/FieldOptions");
const FieldDependencies_1 = require("../../entities/FieldDependencies");
const FormFieldColumns_1 = require("../../entities/FormFieldColumns");
const FormFieldRows_1 = require("../../entities/FormFieldRows");
const FormFieldCalculations_1 = require("../../entities/FormFieldCalculations");
const FormFieldCalculationInputs_1 = require("../../entities/FormFieldCalculationInputs");
const Forms_1 = require("../../entities/Forms");
const KpiDefinitions_1 = require("../../entities/KpiDefinitions");
const Frequencies_1 = require("../../entities/Frequencies");
const KpiSubmissionPeriods_1 = require("../../entities/KpiSubmissionPeriods");
const frequency_periods_1 = require("../../common/frequency/frequency-periods");
const form_field_mapper_1 = require("./mappers/form-field.mapper");
let FieldsService = class FieldsService {
    fieldsRepo;
    optionsRepo;
    dependenciesRepo;
    columnsRepo;
    rowsRepo;
    calculationsRepo;
    calcInputsRepo;
    formsRepo;
    kpiRepo;
    frequenciesRepo;
    periodsRepo;
    constructor(fieldsRepo, optionsRepo, dependenciesRepo, columnsRepo, rowsRepo, calculationsRepo, calcInputsRepo, formsRepo, kpiRepo, frequenciesRepo, periodsRepo) {
        this.fieldsRepo = fieldsRepo;
        this.optionsRepo = optionsRepo;
        this.dependenciesRepo = dependenciesRepo;
        this.columnsRepo = columnsRepo;
        this.rowsRepo = rowsRepo;
        this.calculationsRepo = calculationsRepo;
        this.calcInputsRepo = calcInputsRepo;
        this.formsRepo = formsRepo;
        this.kpiRepo = kpiRepo;
        this.frequenciesRepo = frequenciesRepo;
        this.periodsRepo = periodsRepo;
    }
    async getFields(formId) {
        await this.assertFormExists(formId);
        const fields = await this.fieldsRepo.find({
            where: { formId },
            relations: form_field_mapper_1.FIELD_RESPONSE_RELATIONS,
            order: { displayOrder: 'ASC' },
        });
        return fields.map(form_field_mapper_1.mapFormFieldToResponse);
    }
    async addField(formId, dto) {
        const form = await this.formsRepo.findOne({ where: { formId } });
        if (!form) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
        const duplicate = await this.fieldsRepo.findOne({
            where: { formId, fieldKey: dto.fieldKey },
        });
        if (duplicate) {
            throw new common_1.ConflictException(`FieldKey "${dto.fieldKey}" already exists in form ${formId}`);
        }
        const kpiId = await this.resolveKpiId(form, dto);
        const field = this.fieldsRepo.create({
            formId,
            fieldKey: dto.fieldKey,
            labelEn: dto.labelEn,
            labelAr: dto.labelAr,
            dataTypeId: dto.dataTypeId,
            controlTypeId: dto.controlTypeId,
            displayOrder: dto.displayOrder,
            lookupTypeId: dto.lookupTypeId ?? null,
            kpiId,
            isRequired: dto.isRequired ?? false,
            minValue: dto.minValue ?? null,
            maxValue: dto.maxValue ?? null,
            minLength: dto.minLength ?? null,
            maxLength: dto.maxLength ?? null,
            regexPattern: dto.regexPattern ?? null,
            placeholderEn: dto.placeholderEn ?? null,
            placeholderAr: dto.placeholderAr ?? null,
            defaultValue: dto.defaultValue ?? null,
            helpTextEn: dto.helpTextEn ?? null,
            helpTextAr: dto.helpTextAr ?? null,
            isReadOnly: dto.isReadOnly ?? false,
            isVisible: dto.isVisible ?? true,
            validationMessageEn: dto.validationMessageEn ?? null,
            validationMessageAr: dto.validationMessageAr ?? null,
        });
        const saved = await this.fieldsRepo.save(field);
        return this.loadFieldResponse(saved.fieldId);
    }
    async updateField(formId, fieldId, dto) {
        const field = await this.assertFieldBelongsToForm(formId, fieldId);
        if (dto.labelEn !== undefined)
            field.labelEn = dto.labelEn;
        if (dto.labelAr !== undefined)
            field.labelAr = dto.labelAr;
        if (dto.dataTypeId !== undefined)
            field.dataTypeId = dto.dataTypeId;
        if (dto.controlTypeId !== undefined)
            field.controlTypeId = dto.controlTypeId;
        if (dto.displayOrder !== undefined)
            field.displayOrder = dto.displayOrder;
        if (dto.lookupTypeId !== undefined)
            field.lookupTypeId = dto.lookupTypeId;
        if (dto.kpiId !== undefined)
            field.kpiId = dto.kpiId;
        if (dto.isRequired !== undefined)
            field.isRequired = dto.isRequired;
        if (dto.minValue !== undefined)
            field.minValue = dto.minValue;
        if (dto.maxValue !== undefined)
            field.maxValue = dto.maxValue;
        if (dto.minLength !== undefined)
            field.minLength = dto.minLength;
        if (dto.maxLength !== undefined)
            field.maxLength = dto.maxLength;
        if (dto.regexPattern !== undefined)
            field.regexPattern = dto.regexPattern;
        if (dto.placeholderEn !== undefined)
            field.placeholderEn = dto.placeholderEn;
        if (dto.placeholderAr !== undefined)
            field.placeholderAr = dto.placeholderAr;
        if (dto.defaultValue !== undefined)
            field.defaultValue = dto.defaultValue;
        if (dto.helpTextEn !== undefined)
            field.helpTextEn = dto.helpTextEn;
        if (dto.helpTextAr !== undefined)
            field.helpTextAr = dto.helpTextAr;
        if (dto.isReadOnly !== undefined)
            field.isReadOnly = dto.isReadOnly;
        if (dto.isVisible !== undefined)
            field.isVisible = dto.isVisible;
        if (dto.validationMessageEn !== undefined)
            field.validationMessageEn = dto.validationMessageEn;
        if (dto.validationMessageAr !== undefined)
            field.validationMessageAr = dto.validationMessageAr;
        await this.fieldsRepo.save(field);
        if (dto.isActive !== undefined) {
            await this.updateFieldKpiActive(field.kpiId, dto.isActive);
        }
        if (dto.frequencyId !== undefined) {
            await this.updateFieldKpiFrequency(field, formId, dto.frequencyId, dto.periodStartDate);
        }
        else if (dto.periodStartDate !== undefined) {
            await this.updateFieldKpiPeriodStart(field, dto.periodStartDate);
        }
        return this.loadFieldResponse(fieldId);
    }
    async removeField(formId, fieldId) {
        const field = await this.assertFieldBelongsToForm(formId, fieldId);
        await this.fieldsRepo.remove(field);
    }
    async getFieldFrequency(formId, fieldId, query) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        return this.buildFieldFrequencyResponse(fieldId, query);
    }
    async assignFieldFrequency(formId, fieldId, dto, query) {
        const field = await this.assertFieldBelongsToForm(formId, fieldId);
        await this.updateFieldKpiFrequency(field, formId, dto.frequencyId, dto.periodStartDate);
        return this.buildFieldFrequencyResponse(fieldId, query);
    }
    async addOption(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const duplicate = await this.optionsRepo.findOne({
            where: { fieldId, optionKey: dto.optionKey },
        });
        if (duplicate) {
            throw new common_1.ConflictException(`OptionKey "${dto.optionKey}" already exists on field ${fieldId}`);
        }
        const option = this.optionsRepo.create({
            fieldId,
            optionKey: dto.optionKey,
            optionLabelEn: dto.optionLabelEn,
            optionLabelAr: dto.optionLabelAr,
            optionValue: dto.optionValue,
            displayOrder: dto.displayOrder,
            isActive: dto.isActive ?? true,
        });
        return this.optionsRepo.save(option);
    }
    async removeOption(formId, fieldId, optionId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const option = await this.optionsRepo.findOne({
            where: { optionId, fieldId },
        });
        if (!option) {
            throw new common_1.NotFoundException(`Option ${optionId} not found on field ${fieldId}`);
        }
        await this.optionsRepo.remove(option);
    }
    async addDependency(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        await this.assertFieldBelongsToForm(formId, dto.dependsOnFieldId);
        const dependency = this.dependenciesRepo.create({
            fieldId,
            dependsOnFieldId: dto.dependsOnFieldId,
            conditionOperator: dto.conditionOperator,
            conditionValue: dto.conditionValue,
            action: dto.action,
        });
        return this.dependenciesRepo.save(dependency);
    }
    async removeDependency(formId, fieldId, dependencyId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const dep = await this.dependenciesRepo.findOne({
            where: { dependencyId, fieldId },
        });
        if (!dep) {
            throw new common_1.NotFoundException(`Dependency ${dependencyId} not found on field ${fieldId}`);
        }
        await this.dependenciesRepo.remove(dep);
    }
    async addColumn(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const column = this.columnsRepo.create({
            fieldId,
            columnKey: dto.columnKey,
            labelEn: dto.labelEn,
            labelAr: dto.labelAr,
            displayOrder: dto.displayOrder,
            dataTypeId: dto.dataTypeId,
            controlTypeId: dto.controlTypeId,
            lookupTypeId: dto.lookupTypeId ?? null,
            isRequired: dto.isRequired ?? null,
        });
        return this.columnsRepo.save(column);
    }
    async updateColumn(formId, fieldId, columnId, dto) {
        this.assertHasUpdates(dto);
        await this.assertFieldBelongsToForm(formId, fieldId);
        const column = await this.columnsRepo.findOne({
            where: { columnId, fieldId },
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column ${columnId} not found on field ${fieldId}`);
        }
        if (dto.labelEn !== undefined)
            column.labelEn = dto.labelEn;
        if (dto.labelAr !== undefined)
            column.labelAr = dto.labelAr;
        if (dto.isRequired !== undefined)
            column.isRequired = dto.isRequired;
        return this.columnsRepo.save(column);
    }
    async removeColumn(formId, fieldId, columnId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const col = await this.columnsRepo.findOne({
            where: { columnId, fieldId },
        });
        if (!col) {
            throw new common_1.NotFoundException(`Column ${columnId} not found on field ${fieldId}`);
        }
        await this.columnsRepo.remove(col);
    }
    async addRow(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const row = this.rowsRepo.create({
            fieldId,
            rowKey: dto.rowKey,
            labelEn: dto.labelEn,
            labelAr: dto.labelAr ?? null,
            displayOrder: dto.displayOrder,
            isRequired: dto.isRequired ?? null,
            isReadOnly: dto.isReadOnly ?? null,
            isVisible: dto.isVisible ?? null,
            defaultValue: dto.defaultValue ?? null,
            placeholderEn: dto.placeholderEn ?? null,
            placeholderAr: dto.placeholderAr ?? null,
            helpTextEn: dto.helpTextEn ?? null,
            helpTextAr: dto.helpTextAr ?? null,
            validationMessageEn: dto.validationMessageEn ?? null,
            validationMessageAr: dto.validationMessageAr ?? null,
        });
        return this.rowsRepo.save(row);
    }
    async updateRow(formId, fieldId, rowId, dto) {
        this.assertHasUpdates(dto);
        await this.assertFieldBelongsToForm(formId, fieldId);
        const row = await this.rowsRepo.findOne({ where: { rowId, fieldId } });
        if (!row) {
            throw new common_1.NotFoundException(`Row ${rowId} not found on field ${fieldId}`);
        }
        if (dto.labelEn !== undefined)
            row.labelEn = dto.labelEn;
        if (dto.labelAr !== undefined)
            row.labelAr = dto.labelAr;
        if (dto.isRequired !== undefined)
            row.isRequired = dto.isRequired;
        return this.rowsRepo.save(row);
    }
    async removeRow(formId, fieldId, rowId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const row = await this.rowsRepo.findOne({ where: { rowId, fieldId } });
        if (!row) {
            throw new common_1.NotFoundException(`Row ${rowId} not found on field ${fieldId}`);
        }
        await this.rowsRepo.remove(row);
    }
    async setCalculation(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const existing = await this.calculationsRepo.findOne({
            where: { fieldId },
            relations: { formFieldCalculationInputs: true },
        });
        if (existing) {
            if (existing.formFieldCalculationInputs.length > 0) {
                await this.calcInputsRepo.remove(existing.formFieldCalculationInputs);
            }
            await this.calculationsRepo.remove(existing);
        }
        const calculation = await this.calculationsRepo.save(this.calculationsRepo.create({
            fieldId,
            formulaExpression: dto.formulaExpression,
            resultDataTypeId: dto.resultDataTypeId,
            resultControlTypeId: dto.resultControlTypeId,
            resultColumnKey: dto.resultColumnKey ?? 'RESULT',
            resultLabelEn: dto.resultLabelEn ?? 'Result',
            resultLabelAr: dto.resultLabelAr ?? 'النتيجة',
            resultPrecision: dto.resultPrecision ?? 2,
            buttonLabelEn: dto.buttonLabelEn ?? null,
            buttonLabelAr: dto.buttonLabelAr ?? null,
            helpTextEn: dto.helpTextEn ?? null,
            helpTextAr: dto.helpTextAr ?? null,
            displayFormulaEn: dto.displayFormulaEn ?? null,
            displayFormulaAr: dto.displayFormulaAr ?? null,
            isActive: true,
        }));
        if (dto.inputs.length > 0) {
            const inputs = dto.inputs.map((inp) => this.calcInputsRepo.create({
                calculationId: calculation.calculationId,
                inputToken: inp.inputToken,
                columnKey: inp.columnKey,
                labelEn: inp.labelEn,
                labelAr: inp.labelAr,
                dataTypeId: inp.dataTypeId,
                controlTypeId: inp.controlTypeId,
                displayOrder: inp.displayOrder,
                placeholderEn: inp.placeholderEn ?? null,
                placeholderAr: inp.placeholderAr ?? null,
                isRequired: inp.isRequired ?? true,
                isReadOnly: inp.isReadOnly ?? false,
                isVisible: inp.isVisible ?? true,
                validationMessageEn: inp.validationMessageEn ?? null,
                validationMessageAr: inp.validationMessageAr ?? null,
            }));
            calculation.formFieldCalculationInputs =
                await this.calcInputsRepo.save(inputs);
        }
        return calculation;
    }
    async removeCalculation(formId, fieldId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const calculation = await this.calculationsRepo.findOne({
            where: { fieldId },
            relations: { formFieldCalculationInputs: true },
        });
        if (!calculation) {
            throw new common_1.NotFoundException(`No calculation found on field ${fieldId}`);
        }
        if (calculation.formFieldCalculationInputs.length > 0) {
            await this.calcInputsRepo.remove(calculation.formFieldCalculationInputs);
        }
        await this.calculationsRepo.remove(calculation);
    }
    async addCalculationInput(formId, fieldId, dto) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const calculation = await this.calculationsRepo.findOne({
            where: { fieldId },
        });
        if (!calculation) {
            throw new common_1.NotFoundException(`No calculation found on field ${fieldId}. Create the calculation first.`);
        }
        const duplicate = await this.calcInputsRepo.findOne({
            where: {
                calculationId: calculation.calculationId,
                inputToken: dto.inputToken,
            },
        });
        if (duplicate) {
            throw new common_1.ConflictException(`InputToken "${dto.inputToken}" already exists in this calculation`);
        }
        const input = this.calcInputsRepo.create({
            calculationId: calculation.calculationId,
            inputToken: dto.inputToken,
            columnKey: dto.columnKey,
            labelEn: dto.labelEn,
            labelAr: dto.labelAr,
            dataTypeId: dto.dataTypeId,
            controlTypeId: dto.controlTypeId,
            displayOrder: dto.displayOrder,
            placeholderEn: dto.placeholderEn ?? null,
            placeholderAr: dto.placeholderAr ?? null,
            isRequired: dto.isRequired ?? true,
            isReadOnly: dto.isReadOnly ?? false,
            isVisible: dto.isVisible ?? true,
            validationMessageEn: dto.validationMessageEn ?? null,
            validationMessageAr: dto.validationMessageAr ?? null,
        });
        return this.calcInputsRepo.save(input);
    }
    async removeCalculationInput(formId, fieldId, inputId) {
        await this.assertFieldBelongsToForm(formId, fieldId);
        const calc = await this.calculationsRepo.findOne({ where: { fieldId } });
        if (!calc) {
            throw new common_1.NotFoundException(`No calculation found on field ${fieldId}`);
        }
        const input = await this.calcInputsRepo.findOne({
            where: { inputId, calculationId: calc.calculationId },
        });
        if (!input) {
            throw new common_1.NotFoundException(`Input ${inputId} not found on field ${fieldId}`);
        }
        await this.calcInputsRepo.remove(input);
    }
    assertHasUpdates(dto) {
        const hasUpdate = dto.labelEn !== undefined ||
            dto.labelAr !== undefined ||
            dto.isRequired !== undefined;
        if (!hasUpdate) {
            throw new common_1.BadRequestException('Request body must include at least one of: labelEn, labelAr, isRequired');
        }
    }
    async resolveKpiId(form, dto) {
        if (dto.kpiId !== undefined && dto.kpiId !== null) {
            const exists = await this.kpiRepo.existsBy({ kpiId: dto.kpiId });
            if (!exists) {
                throw new common_1.NotFoundException(`KPI with id ${dto.kpiId} not found`);
            }
            if (dto.frequencyId !== undefined) {
                await this.assertFrequencyExists(dto.frequencyId);
                await this.kpiRepo.update({ kpiId: dto.kpiId }, { frequencyId: dto.frequencyId });
            }
            if (dto.periodStartDate !== undefined) {
                const frequencyId = dto.frequencyId ??
                    (await this.kpiRepo.findOne({ where: { kpiId: dto.kpiId } }))
                        ?.frequencyId;
                if (frequencyId !== undefined && frequencyId !== null) {
                    const frequency = await this.assertFrequencyExists(frequencyId);
                    this.assertPeriodStartAllowed(frequency.code, dto.periodStartDate);
                }
                await this.kpiRepo.update({ kpiId: dto.kpiId }, { referenceDate: this.toReferenceDate(dto.periodStartDate) });
            }
            return dto.kpiId;
        }
        const kpiCode = await this.buildUniqueKpiCode(form.formKey, dto.fieldKey);
        if (form.directorateId === null) {
            throw new common_1.BadRequestException('Form must have a directorateId before a field KPI can be auto-created');
        }
        const frequencyId = await this.resolveFrequencyId(dto.frequencyId, form.frequencyId);
        if (dto.periodStartDate !== undefined && frequencyId !== null) {
            const frequency = await this.assertFrequencyExists(frequencyId);
            this.assertPeriodStartAllowed(frequency.code, dto.periodStartDate);
        }
        const kpi = this.kpiRepo.create({
            kpiCode,
            nameEn: dto.labelEn,
            nameAr: dto.labelAr,
            directorateId: form.directorateId,
            dataTypeId: dto.dataTypeId,
            frequencyId,
            referenceDate: dto.periodStartDate
                ? this.toReferenceDate(dto.periodStartDate)
                : null,
            isActive: true,
        });
        const savedKpi = await this.kpiRepo.save(kpi);
        return savedKpi.kpiId;
    }
    async buildUniqueKpiCode(formKey, fieldKey) {
        const base = `${formKey}_${fieldKey}`.slice(0, 50);
        let candidate = base;
        let suffix = 0;
        while (await this.kpiRepo.existsBy({ kpiCode: candidate })) {
            suffix += 1;
            const suffixStr = `-${String(suffix)}`;
            candidate = `${base.slice(0, 50 - suffixStr.length)}${suffixStr}`;
        }
        return candidate;
    }
    async updateFieldKpiActive(kpiId, isActive) {
        if (kpiId === null) {
            throw new common_1.BadRequestException('Field has no linked KPI — cannot update isActive');
        }
        const kpi = await this.kpiRepo.findOne({ where: { kpiId } });
        if (!kpi) {
            throw new common_1.NotFoundException(`KPI with id ${kpiId} not found`);
        }
        kpi.isActive = isActive;
        await this.kpiRepo.save(kpi);
    }
    async updateFieldKpiFrequency(field, formId, frequencyId, periodStartDate) {
        const frequency = await this.assertFrequencyExists(frequencyId);
        this.assertPeriodStartAllowed(frequency.code, periodStartDate);
        if (field.kpiId !== null) {
            const kpi = await this.kpiRepo.findOne({ where: { kpiId: field.kpiId } });
            if (!kpi) {
                throw new common_1.NotFoundException(`KPI with id ${field.kpiId} not found`);
            }
            kpi.frequencyId = frequencyId;
            if (periodStartDate !== undefined) {
                kpi.referenceDate =
                    periodStartDate === null
                        ? null
                        : this.toReferenceDate(periodStartDate);
            }
            await this.kpiRepo.save(kpi);
            return;
        }
        const form = await this.formsRepo.findOne({ where: { formId } });
        if (!form) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
        if (form.directorateId === null) {
            throw new common_1.BadRequestException('Form must have a directorateId before a field KPI can be auto-created');
        }
        const kpiCode = await this.buildUniqueKpiCode(form.formKey, field.fieldKey);
        const kpi = this.kpiRepo.create({
            kpiCode,
            nameEn: field.labelEn,
            nameAr: field.labelAr,
            directorateId: form.directorateId,
            dataTypeId: field.dataTypeId,
            frequencyId,
            referenceDate: periodStartDate === undefined || periodStartDate === null
                ? null
                : this.toReferenceDate(periodStartDate),
            isActive: true,
        });
        const savedKpi = await this.kpiRepo.save(kpi);
        field.kpiId = savedKpi.kpiId;
        await this.fieldsRepo.save(field);
    }
    async updateFieldKpiPeriodStart(field, periodStartDate) {
        if (field.kpiId === null) {
            throw new common_1.BadRequestException('Field has no linked KPI — cannot update periodStartDate');
        }
        const kpi = await this.kpiRepo.findOne({
            where: { kpiId: field.kpiId },
            relations: { frequency: true },
        });
        if (!kpi) {
            throw new common_1.NotFoundException(`KPI with id ${field.kpiId} not found`);
        }
        if (kpi.frequency) {
            this.assertPeriodStartAllowed(kpi.frequency.code, periodStartDate);
        }
        kpi.referenceDate =
            periodStartDate === null ? null : this.toReferenceDate(periodStartDate);
        await this.kpiRepo.save(kpi);
    }
    async resolveFrequencyId(requestedFrequencyId, formFrequencyId) {
        if (requestedFrequencyId !== undefined) {
            await this.assertFrequencyExists(requestedFrequencyId);
            return requestedFrequencyId;
        }
        if (formFrequencyId !== null) {
            await this.assertFrequencyExists(formFrequencyId);
            return formFrequencyId;
        }
        return null;
    }
    async assertFrequencyExists(frequencyId) {
        const frequency = await this.frequenciesRepo.findOne({
            where: { frequencyId, isActive: true },
        });
        if (!frequency) {
            throw new common_1.NotFoundException(`Frequency with id ${frequencyId} not found`);
        }
        return frequency;
    }
    async buildFieldFrequencyResponse(fieldId, query) {
        const field = await this.fieldsRepo.findOne({
            where: { fieldId },
            relations: { kpi: { frequency: true } },
        });
        if (!field) {
            throw new common_1.NotFoundException(`Field with id ${fieldId} not found`);
        }
        const year = query.year ?? new Date().getUTCFullYear();
        const frequency = field.kpi?.frequency ?? null;
        const frequencySummary = frequency
            ? this.toFrequencySummary(frequency)
            : null;
        const storedPeriodStart = field.kpi?.referenceDate
            ? (0, frequency_periods_1.formatDateOnly)(field.kpi.referenceDate)
            : null;
        const expectedPeriods = frequency === null
            ? []
            : (0, frequency_periods_1.generateExpectedPeriods)(frequency.code, {
                year,
                month: query.month,
                anchor: this.resolveGenerateAnchor(query, field.kpi?.referenceDate),
            });
        const submittedPeriods = await this.findSubmittedPeriods(field.kpiId, year, query.month);
        return {
            fieldId: field.fieldId,
            kpiId: field.kpiId,
            frequencyId: field.kpi?.frequencyId ?? null,
            frequency: frequencySummary,
            periodStartDate: storedPeriodStart,
            expectedPeriods,
            submittedPeriods,
        };
    }
    toFrequencySummary(frequency) {
        return {
            frequencyId: frequency.frequencyId,
            code: frequency.code,
            nameEn: frequency.nameEn,
            nameAr: frequency.nameAr,
            description: frequency.description,
            hasDiscretePeriods: (0, frequency_periods_1.hasDiscretePeriods)(frequency.code),
            supportsCustomPeriodStart: (0, frequency_periods_1.supportsCustomPeriodStart)(frequency.code),
        };
    }
    resolveGenerateAnchor(query, referenceDate) {
        if (query.periodStartDate !== undefined) {
            const parsed = (0, frequency_periods_1.parsePeriodStartDate)(query.periodStartDate);
            if (!parsed) {
                throw new common_1.BadRequestException(`Invalid periodStartDate "${query.periodStartDate}". Use a real calendar date (YYYY-MM-DD).`);
            }
            return parsed;
        }
        if (referenceDate) {
            return (0, frequency_periods_1.periodAnchorFromDate)(referenceDate);
        }
        return undefined;
    }
    assertPeriodStartAllowed(code, periodStartDate) {
        if (periodStartDate === undefined || periodStartDate === null) {
            return;
        }
        const anchor = (0, frequency_periods_1.parsePeriodStartDate)(periodStartDate);
        if (!anchor) {
            throw new common_1.BadRequestException(`Invalid periodStartDate "${periodStartDate}". Use a real calendar date (YYYY-MM-DD).`);
        }
        if (anchor.month === 1 && anchor.day === 1) {
            return;
        }
        if (!(0, frequency_periods_1.supportsCustomPeriodStart)(code)) {
            throw new common_1.BadRequestException(`Frequency ${code} does not support a custom period start date`);
        }
    }
    toReferenceDate(value) {
        const parsed = (0, frequency_periods_1.parsePeriodStartDate)(value);
        if (!parsed) {
            throw new common_1.BadRequestException(`Invalid periodStartDate "${value}". Use a real calendar date (YYYY-MM-DD).`);
        }
        return new Date(Date.UTC(Number(value.trim().slice(0, 4)), parsed.month - 1, parsed.day));
    }
    async findSubmittedPeriods(kpiId, year, month) {
        if (kpiId === null) {
            return [];
        }
        const fromDate = month === undefined
            ? `${String(year)}-01-01`
            : `${String(year)}-${String(month).padStart(2, '0')}-01`;
        const toDate = month === undefined
            ? `${String(year)}-12-31`
            : this.lastCalendarDay(year, month);
        const rows = await this.periodsRepo
            .createQueryBuilder('period')
            .where('period.kpiId = :kpiId', { kpiId })
            .andWhere('period.periodStartDate >= :fromDate', { fromDate })
            .andWhere('period.periodStartDate <= :toDate', { toDate })
            .orderBy('period.periodStartDate', 'ASC')
            .getMany();
        return rows.map((row) => ({
            kpiSubmissionPeriodId: row.kpiSubmissionPeriodId,
            submissionId: row.submissionId,
            directorateId: row.directorateId,
            kpiId: row.kpiId,
            frequencyId: row.frequencyId,
            periodStartDate: (0, frequency_periods_1.formatDateOnly)(row.periodStartDate),
            submissionStatus: row.submissionStatus,
            createdAt: row.createdAt,
        }));
    }
    lastCalendarDay(year, month) {
        const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
        return `${String(year)}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    }
    async loadFieldResponse(fieldId) {
        const field = await this.fieldsRepo.findOne({
            where: { fieldId },
            relations: form_field_mapper_1.FIELD_RESPONSE_RELATIONS,
        });
        if (!field) {
            throw new common_1.NotFoundException(`Field with id ${fieldId} not found`);
        }
        return (0, form_field_mapper_1.mapFormFieldToResponse)(field);
    }
    async assertFormExists(formId) {
        const exists = await this.formsRepo.existsBy({ formId });
        if (!exists) {
            throw new common_1.NotFoundException(`Form with id ${formId} not found`);
        }
    }
    async assertFieldBelongsToForm(formId, fieldId) {
        const field = await this.fieldsRepo.findOne({ where: { fieldId, formId } });
        if (!field) {
            throw new common_1.NotFoundException(`Field ${fieldId} not found in form ${formId}`);
        }
        return field;
    }
};
exports.FieldsService = FieldsService;
exports.FieldsService = FieldsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(FormFields_1.FormFields)),
    __param(1, (0, typeorm_1.InjectRepository)(FieldOptions_1.FieldOptions)),
    __param(2, (0, typeorm_1.InjectRepository)(FieldDependencies_1.FieldDependencies)),
    __param(3, (0, typeorm_1.InjectRepository)(FormFieldColumns_1.FormFieldColumns)),
    __param(4, (0, typeorm_1.InjectRepository)(FormFieldRows_1.FormFieldRows)),
    __param(5, (0, typeorm_1.InjectRepository)(FormFieldCalculations_1.FormFieldCalculations)),
    __param(6, (0, typeorm_1.InjectRepository)(FormFieldCalculationInputs_1.FormFieldCalculationInputs)),
    __param(7, (0, typeorm_1.InjectRepository)(Forms_1.Forms)),
    __param(8, (0, typeorm_1.InjectRepository)(KpiDefinitions_1.KpiDefinitions)),
    __param(9, (0, typeorm_1.InjectRepository)(Frequencies_1.Frequencies)),
    __param(10, (0, typeorm_1.InjectRepository)(KpiSubmissionPeriods_1.KpiSubmissionPeriods)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FieldsService);
//# sourceMappingURL=fields.service.js.map