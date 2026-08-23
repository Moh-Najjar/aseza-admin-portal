import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormFields } from '../../entities/FormFields';
import { FieldOptions } from '../../entities/FieldOptions';
import { FieldDependencies } from '../../entities/FieldDependencies';
import { FormFieldColumns } from '../../entities/FormFieldColumns';
import { FormFieldRows } from '../../entities/FormFieldRows';
import { FormFieldCalculations } from '../../entities/FormFieldCalculations';
import { FormFieldCalculationInputs } from '../../entities/FormFieldCalculationInputs';
import { Forms } from '../../entities/Forms';
import { KpiDefinitions } from '../../entities/KpiDefinitions';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateRowDto } from './dto/create-row.dto';
import {
  CreateCalculationDto,
  CreateCalculationInputDto,
} from './dto/create-calculation.dto';
import {
  FIELD_RESPONSE_RELATIONS,
  FormFieldResponse,
  mapFormFieldToResponse,
} from './mappers/form-field.mapper';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(FormFields)
    private readonly fieldsRepo: Repository<FormFields>,

    @InjectRepository(FieldOptions)
    private readonly optionsRepo: Repository<FieldOptions>,

    @InjectRepository(FieldDependencies)
    private readonly dependenciesRepo: Repository<FieldDependencies>,

    @InjectRepository(FormFieldColumns)
    private readonly columnsRepo: Repository<FormFieldColumns>,

    @InjectRepository(FormFieldRows)
    private readonly rowsRepo: Repository<FormFieldRows>,

    @InjectRepository(FormFieldCalculations)
    private readonly calculationsRepo: Repository<FormFieldCalculations>,

    @InjectRepository(FormFieldCalculationInputs)
    private readonly calcInputsRepo: Repository<FormFieldCalculationInputs>,

    @InjectRepository(Forms)
    private readonly formsRepo: Repository<Forms>,

    @InjectRepository(KpiDefinitions)
    private readonly kpiRepo: Repository<KpiDefinitions>,
  ) {}

  // ─── Fields ──────────────────────────────────────────────────────────────

  async getFields(formId: number): Promise<FormFieldResponse[]> {
    await this.assertFormExists(formId);

    const fields = await this.fieldsRepo.find({
      where: { formId },
      relations: FIELD_RESPONSE_RELATIONS,
      order: { displayOrder: 'ASC' },
    });

    return fields.map(mapFormFieldToResponse);
  }

  async addField(formId: number, dto: CreateFieldDto): Promise<FormFieldResponse> {
    const form = await this.formsRepo.findOne({ where: { formId } });

    if (!form) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }

    // Ensure FieldKey is unique within this form
    const duplicate = await this.fieldsRepo.findOne({
      where: { formId, fieldKey: dto.fieldKey },
    });
    if (duplicate) {
      throw new ConflictException(
        `FieldKey "${dto.fieldKey}" already exists in form ${formId}`,
      );
    }

    // Resolve KPI — use provided kpiId or auto-create from form + field metadata
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

  async updateField(
    formId: number,
    fieldId: number,
    dto: UpdateFieldDto,
  ): Promise<FormFieldResponse> {
    const field = await this.assertFieldBelongsToForm(formId, fieldId);

    // Apply only provided fields (PATCH semantics)
    if (dto.labelEn !== undefined) field.labelEn = dto.labelEn;
    if (dto.labelAr !== undefined) field.labelAr = dto.labelAr;
    if (dto.dataTypeId !== undefined) field.dataTypeId = dto.dataTypeId;
    if (dto.controlTypeId !== undefined)
      field.controlTypeId = dto.controlTypeId;
    if (dto.displayOrder !== undefined) field.displayOrder = dto.displayOrder;
    if (dto.lookupTypeId !== undefined) field.lookupTypeId = dto.lookupTypeId;
    if (dto.kpiId !== undefined) field.kpiId = dto.kpiId;
    if (dto.isRequired !== undefined) field.isRequired = dto.isRequired;
    if (dto.minValue !== undefined) field.minValue = dto.minValue;
    if (dto.maxValue !== undefined) field.maxValue = dto.maxValue;
    if (dto.minLength !== undefined) field.minLength = dto.minLength;
    if (dto.maxLength !== undefined) field.maxLength = dto.maxLength;
    if (dto.regexPattern !== undefined) field.regexPattern = dto.regexPattern;
    if (dto.placeholderEn !== undefined)
      field.placeholderEn = dto.placeholderEn;
    if (dto.placeholderAr !== undefined)
      field.placeholderAr = dto.placeholderAr;
    if (dto.defaultValue !== undefined) field.defaultValue = dto.defaultValue;
    if (dto.helpTextEn !== undefined) field.helpTextEn = dto.helpTextEn;
    if (dto.helpTextAr !== undefined) field.helpTextAr = dto.helpTextAr;
    if (dto.isReadOnly !== undefined) field.isReadOnly = dto.isReadOnly;
    if (dto.isVisible !== undefined) field.isVisible = dto.isVisible;
    if (dto.validationMessageEn !== undefined)
      field.validationMessageEn = dto.validationMessageEn;
    if (dto.validationMessageAr !== undefined)
      field.validationMessageAr = dto.validationMessageAr;

    await this.fieldsRepo.save(field);

    // isActive lives on the linked KPI — persist after field save so kpiId changes apply first
    if (dto.isActive !== undefined) {
      await this.updateFieldKpiActive(field.kpiId, dto.isActive);
    }

    return this.loadFieldResponse(fieldId);
  }

  async removeField(formId: number, fieldId: number): Promise<void> {
    const field = await this.assertFieldBelongsToForm(formId, fieldId);
    await this.fieldsRepo.remove(field);
  }

  // ─── Field Options ────────────────────────────────────────────────────────

  async addOption(
    formId: number,
    fieldId: number,
    dto: CreateOptionDto,
  ): Promise<FieldOptions> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const duplicate = await this.optionsRepo.findOne({
      where: { fieldId, optionKey: dto.optionKey },
    });
    if (duplicate) {
      throw new ConflictException(
        `OptionKey "${dto.optionKey}" already exists on field ${fieldId}`,
      );
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

  async removeOption(
    formId: number,
    fieldId: number,
    optionId: number,
  ): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const option = await this.optionsRepo.findOne({
      where: { optionId, fieldId },
    });

    if (!option) {
      throw new NotFoundException(
        `Option ${optionId} not found on field ${fieldId}`,
      );
    }

    await this.optionsRepo.remove(option);
  }

  // ─── Field Dependencies ───────────────────────────────────────────────────

  async addDependency(
    formId: number,
    fieldId: number,
    dto: CreateDependencyDto,
  ): Promise<FieldDependencies> {
    await this.assertFieldBelongsToForm(formId, fieldId);
    // Ensure the trigger field also belongs to this form
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

  async removeDependency(
    formId: number,
    fieldId: number,
    dependencyId: number,
  ): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const dep = await this.dependenciesRepo.findOne({
      where: { dependencyId, fieldId },
    });

    if (!dep) {
      throw new NotFoundException(
        `Dependency ${dependencyId} not found on field ${fieldId}`,
      );
    }

    await this.dependenciesRepo.remove(dep);
  }

  // ─── Table Columns ────────────────────────────────────────────────────────

  async addColumn(
    formId: number,
    fieldId: number,
    dto: CreateColumnDto,
  ): Promise<FormFieldColumns> {
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
    });

    return this.columnsRepo.save(column);
  }

  async removeColumn(
    formId: number,
    fieldId: number,
    columnId: number,
  ): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const col = await this.columnsRepo.findOne({
      where: { columnId, fieldId },
    });

    if (!col) {
      throw new NotFoundException(
        `Column ${columnId} not found on field ${fieldId}`,
      );
    }

    await this.columnsRepo.remove(col);
  }

  // ─── Table Rows ───────────────────────────────────────────────────────────

  async addRow(
    formId: number,
    fieldId: number,
    dto: CreateRowDto,
  ): Promise<FormFieldRows> {
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

  async removeRow(
    formId: number,
    fieldId: number,
    rowId: number,
  ): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const row = await this.rowsRepo.findOne({ where: { rowId, fieldId } });

    if (!row) {
      throw new NotFoundException(`Row ${rowId} not found on field ${fieldId}`);
    }

    await this.rowsRepo.remove(row);
  }

  // ─── Calculation ──────────────────────────────────────────────────────────

  async setCalculation(
    formId: number,
    fieldId: number,
    dto: CreateCalculationDto,
  ): Promise<FormFieldCalculations> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    // Remove existing calculation first (only one allowed per field)
    const existing = await this.calculationsRepo.findOne({
      where: { fieldId },
      relations: { formFieldCalculationInputs: true },
    });

    if (existing) {
      // Cascade-delete inputs first, then the calculation
      if (existing.formFieldCalculationInputs.length > 0) {
        await this.calcInputsRepo.remove(existing.formFieldCalculationInputs);
      }
      await this.calculationsRepo.remove(existing);
    }

    // Create the new calculation record
    const calculation = await this.calculationsRepo.save(
      this.calculationsRepo.create({
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
      }),
    );

    // Create all input records linked to the new calculation
    if (dto.inputs.length > 0) {
      const inputs = dto.inputs.map((inp) =>
        this.calcInputsRepo.create({
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
        }),
      );
      calculation.formFieldCalculationInputs =
        await this.calcInputsRepo.save(inputs);
    }

    return calculation;
  }

  async removeCalculation(formId: number, fieldId: number): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const calculation = await this.calculationsRepo.findOne({
      where: { fieldId },
      relations: { formFieldCalculationInputs: true },
    });

    if (!calculation) {
      throw new NotFoundException(`No calculation found on field ${fieldId}`);
    }

    if (calculation.formFieldCalculationInputs.length > 0) {
      await this.calcInputsRepo.remove(calculation.formFieldCalculationInputs);
    }

    await this.calculationsRepo.remove(calculation);
  }

  async addCalculationInput(
    formId: number,
    fieldId: number,
    dto: CreateCalculationInputDto,
  ): Promise<FormFieldCalculationInputs> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const calculation = await this.calculationsRepo.findOne({
      where: { fieldId },
    });

    if (!calculation) {
      throw new NotFoundException(
        `No calculation found on field ${fieldId}. Create the calculation first.`,
      );
    }

    const duplicate = await this.calcInputsRepo.findOne({
      where: {
        calculationId: calculation.calculationId,
        inputToken: dto.inputToken,
      },
    });

    if (duplicate) {
      throw new ConflictException(
        `InputToken "${dto.inputToken}" already exists in this calculation`,
      );
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

  async removeCalculationInput(
    formId: number,
    fieldId: number,
    inputId: number,
  ): Promise<void> {
    await this.assertFieldBelongsToForm(formId, fieldId);

    const calc = await this.calculationsRepo.findOne({ where: { fieldId } });

    if (!calc) {
      throw new NotFoundException(`No calculation found on field ${fieldId}`);
    }

    const input = await this.calcInputsRepo.findOne({
      where: { inputId, calculationId: calc.calculationId },
    });

    if (!input) {
      throw new NotFoundException(
        `Input ${inputId} not found on field ${fieldId}`,
      );
    }

    await this.calcInputsRepo.remove(input);
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  /**
   * Returns an existing kpiId from the DTO, or auto-creates a KpiDefinitions row
   * using the parent form's directorateId/frequencyId and the field labels.
   */
  private async resolveKpiId(
    form: Forms,
    dto: CreateFieldDto,
  ): Promise<number> {
    if (dto.kpiId !== undefined && dto.kpiId !== null) {
      const exists = await this.kpiRepo.existsBy({ kpiId: dto.kpiId });
      if (!exists) {
        throw new NotFoundException(`KPI with id ${dto.kpiId} not found`);
      }
      return dto.kpiId;
    }

    const kpiCode = await this.buildUniqueKpiCode(
      form.formKey,
      dto.fieldKey,
    );

    if (form.directorateId === null) {
      throw new BadRequestException(
        'Form must have a directorateId before a field KPI can be auto-created',
      );
    }

    const kpi = this.kpiRepo.create({
      kpiCode,
      nameEn: dto.labelEn,
      nameAr: dto.labelAr,
      directorateId: form.directorateId,
      dataTypeId: dto.dataTypeId,
      frequencyId: form.frequencyId,
      isActive: true,
    });

    const savedKpi = await this.kpiRepo.save(kpi);
    return savedKpi.kpiId;
  }

  /** Builds a globally-unique KpiCode (max 50 chars) from formKey + fieldKey */
  private async buildUniqueKpiCode(
    formKey: string,
    fieldKey: string,
  ): Promise<string> {
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

  /**
   * Sets IsActive on the KPI linked to a form field.
   * Field-level isActive is projected from KpiDefinitions — not stored on FormFields.
   */
  private async updateFieldKpiActive(
    kpiId: number | null,
    isActive: boolean,
  ): Promise<void> {
    if (kpiId === null) {
      throw new BadRequestException(
        'Field has no linked KPI — cannot update isActive',
      );
    }

    const kpi = await this.kpiRepo.findOne({ where: { kpiId } });

    if (!kpi) {
      throw new NotFoundException(`KPI with id ${kpiId} not found`);
    }

    kpi.isActive = isActive;
    await this.kpiRepo.save(kpi);
  }

  /** Reloads a field with KPI + sub-relations and maps to the API response shape */
  private async loadFieldResponse(fieldId: number): Promise<FormFieldResponse> {
    const field = await this.fieldsRepo.findOne({
      where: { fieldId },
      relations: FIELD_RESPONSE_RELATIONS,
    });

    if (!field) {
      throw new NotFoundException(`Field with id ${fieldId} not found`);
    }

    return mapFormFieldToResponse(field);
  }

  private async assertFormExists(formId: number): Promise<void> {
    const exists = await this.formsRepo.existsBy({ formId });
    if (!exists) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }
  }

  /** Loads the field and verifies it belongs to the given form */
  private async assertFieldBelongsToForm(
    formId: number,
    fieldId: number,
  ): Promise<FormFields> {
    const field = await this.fieldsRepo.findOne({ where: { fieldId, formId } });

    if (!field) {
      throw new NotFoundException(
        `Field ${fieldId} not found in form ${formId}`,
      );
    }

    return field;
  }
}
