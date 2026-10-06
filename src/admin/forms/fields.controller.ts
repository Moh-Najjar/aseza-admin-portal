import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateRowDto } from './dto/create-row.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateRowDto } from './dto/update-row.dto';
import { AssignFieldFrequencyDto } from './dto/assign-field-frequency.dto';
import {
  CreateCalculationDto,
  CreateCalculationInputDto,
} from './dto/create-calculation.dto';
import { FrequencyPeriodsQueryDto } from '../../common/dto/frequency-periods-query.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { FormFieldResponse } from './mappers/form-field.mapper';
import { FieldFrequencyResponse } from './fields.service';
import { FieldOptions } from '../../entities/FieldOptions';
import { FieldDependencies } from '../../entities/FieldDependencies';
import { FormFieldColumns } from '../../entities/FormFieldColumns';
import { FormFieldRows } from '../../entities/FormFieldRows';
import { FormFieldCalculations } from '../../entities/FormFieldCalculations';
import { FormFieldCalculationInputs } from '../../entities/FormFieldCalculationInputs';

/** Base path: /admin/forms/:formId/fields */
@Controller('admin/forms/:formId/fields')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  // ── Fields ────────────────────────────────────────────────────────────────

  /** GET /admin/forms/:formId/fields — list all fields with sub-relations */
  @Get()
  getFields(
    @Param('formId', ParseIntPipe) formId: number,
  ): Promise<FormFieldResponse[]> {
    return this.fieldsService.getFields(formId);
  }

  /** POST /admin/forms/:formId/fields — add a new field to the form */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addField(
    @Param('formId', ParseIntPipe) formId: number,
    @Body() dto: CreateFieldDto,
  ): Promise<FormFieldResponse> {
    return this.fieldsService.addField(formId, dto);
  }

  /** PATCH /admin/forms/:formId/fields/:fieldId — partially update a field */
  @Patch(':fieldId')
  updateField(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: UpdateFieldDto,
  ): Promise<FormFieldResponse> {
    return this.fieldsService.updateField(formId, fieldId, dto);
  }

  /** DELETE /admin/forms/:formId/fields/:fieldId — remove a field */
  @Delete(':fieldId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeField(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
  ): Promise<void> {
    return this.fieldsService.removeField(formId, fieldId);
  }

  // ── Frequency (catalog type + period windows) ─────────────────────────────

  /**
   * GET /admin/forms/:formId/fields/:fieldId/frequency
   * Returns the field's KPI frequency, expected calendar windows, and submitted periods.
   */
  @Get(':fieldId/frequency')
  getFieldFrequency(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Query() query: FrequencyPeriodsQueryDto,
  ): Promise<FieldFrequencyResponse> {
    return this.fieldsService.getFieldFrequency(formId, fieldId, query);
  }

  /**
   * PUT /admin/forms/:formId/fields/:fieldId/frequency
   * Assigns a dbo.Frequencies row to the field's KPI, optionally with a
   * recurring period start date (KpiDefinitions.ReferenceDate).
   * Body: { frequencyId, periodStartDate?: "2026-02-01" | null }
   */
  @Put(':fieldId/frequency')
  assignFieldFrequency(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: AssignFieldFrequencyDto,
    @Query() query: FrequencyPeriodsQueryDto,
  ): Promise<FieldFrequencyResponse> {
    return this.fieldsService.assignFieldFrequency(formId, fieldId, dto, query);
  }

  // ── Options (DROPDOWN / RADIO / MULTI_SELECT) ─────────────────────────────

  /** POST /admin/forms/:formId/fields/:fieldId/options */
  @Post(':fieldId/options')
  @HttpCode(HttpStatus.CREATED)
  addOption(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateOptionDto,
  ): Promise<FieldOptions> {
    return this.fieldsService.addOption(formId, fieldId, dto);
  }

  /** DELETE /admin/forms/:formId/fields/:fieldId/options/:optionId */
  @Delete(':fieldId/options/:optionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeOption(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('optionId', ParseIntPipe) optionId: number,
  ): Promise<void> {
    return this.fieldsService.removeOption(formId, fieldId, optionId);
  }

  // ── Dependencies (show/hide/require rules) ────────────────────────────────

  /** POST /admin/forms/:formId/fields/:fieldId/dependencies */
  @Post(':fieldId/dependencies')
  @HttpCode(HttpStatus.CREATED)
  addDependency(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateDependencyDto,
  ): Promise<FieldDependencies> {
    return this.fieldsService.addDependency(formId, fieldId, dto);
  }

  /** DELETE /admin/forms/:formId/fields/:fieldId/dependencies/:dependencyId */
  @Delete(':fieldId/dependencies/:dependencyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeDependency(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('dependencyId', ParseIntPipe) dependencyId: number,
  ): Promise<void> {
    return this.fieldsService.removeDependency(formId, fieldId, dependencyId);
  }

  // ── Table Columns (TABLE / GRID fields) ───────────────────────────────────

  /** POST /admin/forms/:formId/fields/:fieldId/columns */
  @Post(':fieldId/columns')
  @HttpCode(HttpStatus.CREATED)
  addColumn(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateColumnDto,
  ): Promise<FormFieldColumns> {
    return this.fieldsService.addColumn(formId, fieldId, dto);
  }

  /**
   * PATCH /admin/forms/:formId/fields/:fieldId/columns/:columnId
   * Partially updates labelEn / labelAr / isRequired. Keys and types are not editable.
   */
  @Patch(':fieldId/columns/:columnId')
  updateColumn(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() dto: UpdateColumnDto,
  ): Promise<FormFieldColumns> {
    return this.fieldsService.updateColumn(formId, fieldId, columnId, dto);
  }

  /** DELETE /admin/forms/:formId/fields/:fieldId/columns/:columnId */
  @Delete(':fieldId/columns/:columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeColumn(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<void> {
    return this.fieldsService.removeColumn(formId, fieldId, columnId);
  }

  // ── Table Rows (TABLE / GRID fields) ──────────────────────────────────────

  /** POST /admin/forms/:formId/fields/:fieldId/rows */
  @Post(':fieldId/rows')
  @HttpCode(HttpStatus.CREATED)
  addRow(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateRowDto,
  ): Promise<FormFieldRows> {
    return this.fieldsService.addRow(formId, fieldId, dto);
  }

  /**
   * PATCH /admin/forms/:formId/fields/:fieldId/rows/:rowId
   * Partially updates labelEn / labelAr / isRequired. RowKey is not editable.
   */
  @Patch(':fieldId/rows/:rowId')
  updateRow(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('rowId', ParseIntPipe) rowId: number,
    @Body() dto: UpdateRowDto,
  ): Promise<FormFieldRows> {
    return this.fieldsService.updateRow(formId, fieldId, rowId, dto);
  }

  /** DELETE /admin/forms/:formId/fields/:fieldId/rows/:rowId */
  @Delete(':fieldId/rows/:rowId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRow(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('rowId', ParseIntPipe) rowId: number,
  ): Promise<void> {
    return this.fieldsService.removeRow(formId, fieldId, rowId);
  }

  // ── Calculation (CALCULATED fields) ──────────────────────────────────────

  /**
   * POST /admin/forms/:formId/fields/:fieldId/calculation
   * Creates or replaces the calculation for a field (includes inputs inline).
   */
  @Post(':fieldId/calculation')
  @HttpCode(HttpStatus.OK)
  setCalculation(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateCalculationDto,
  ): Promise<FormFieldCalculations> {
    return this.fieldsService.setCalculation(formId, fieldId, dto);
  }

  /**
   * DELETE /admin/forms/:formId/fields/:fieldId/calculation
   * Removes the calculation and all its inputs.
   */
  @Delete(':fieldId/calculation')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCalculation(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
  ): Promise<void> {
    return this.fieldsService.removeCalculation(formId, fieldId);
  }

  /**
   * POST /admin/forms/:formId/fields/:fieldId/calculation/inputs
   * Adds a single input to an existing calculation.
   */
  @Post(':fieldId/calculation/inputs')
  @HttpCode(HttpStatus.CREATED)
  addCalculationInput(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Body() dto: CreateCalculationInputDto,
  ): Promise<FormFieldCalculationInputs> {
    return this.fieldsService.addCalculationInput(formId, fieldId, dto);
  }

  /**
   * DELETE /admin/forms/:formId/fields/:fieldId/calculation/inputs/:inputId
   */
  @Delete(':fieldId/calculation/inputs/:inputId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCalculationInput(
    @Param('formId', ParseIntPipe) formId: number,
    @Param('fieldId', ParseIntPipe) fieldId: number,
    @Param('inputId', ParseIntPipe) inputId: number,
  ): Promise<void> {
    return this.fieldsService.removeCalculationInput(formId, fieldId, inputId);
  }
}
