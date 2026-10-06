import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFieldDto {
  /** Machine-readable key, unique within the form — e.g. "APPLICANT_NAME" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fieldKey!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr!: string;

  /** FK to dbo.DataTypes — e.g. TEXT, NUMBER, DATE, BOOLEAN */
  @IsInt()
  @IsPositive()
  dataTypeId!: number;

  /**
   * FK to dbo.ControlTypes — e.g. TEXTBOX, DROPDOWN, CHECKBOX, DATE_PICKER,
   * TABLE, CALCULATED
   */
  @IsInt()
  @IsPositive()
  controlTypeId!: number;

  /** 1-based display order within the form */
  @IsInt()
  @Min(1)
  displayOrder!: number;

  /** FK to dbo.LookupTypes — required when controlType is DROPDOWN or RADIO */
  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  /** FK to dbo.KpiDefinitions — optional; auto-created from form + field labels when omitted */
  @IsOptional()
  @IsInt()
  @IsPositive()
  kpiId?: number;

  /**
   * FK to dbo.Frequencies — how often this field's KPI is reported.
   * Applied to the linked/auto-created KpiDefinitions row.
   * Falls back to the parent form's frequencyId when omitted.
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  frequencyId?: number;

  /**
   * Recurring period start (YYYY-MM-DD). Stored on KpiDefinitions.ReferenceDate.
   * Example: "2026-02-01" with ANNUALLY = first of February every year.
   */
  @IsOptional()
  @IsDateString()
  periodStartDate?: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  minValue?: number;

  @IsOptional()
  @IsNumber()
  maxValue?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minLength?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxLength?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  regexPattern?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderAr?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  defaultValue?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextAr?: string;

  @IsOptional()
  @IsBoolean()
  isReadOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageAr?: string;
}
