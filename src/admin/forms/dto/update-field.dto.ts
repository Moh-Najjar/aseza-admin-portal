import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

/** All fields optional — only provided fields are updated (PATCH semantics) */
export class UpdateFieldDto {
  /**
   * Field label in English
   * @example "Applicant Name"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  labelEn?: string;

  /**
   * Field label in Arabic
   * @example "اسم مقدم الطلب"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  labelAr?: string;

  /**
   * FK to dbo.DataTypes
   * @example 1
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  dataTypeId?: number;

  /**
   * FK to dbo.ControlTypes
   * @example 1
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  controlTypeId?: number;

  /**
   * 1-based display order within the form
   * @example 2
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  displayOrder?: number;

  /**
   * FK to dbo.LookupTypes — for DROPDOWN or RADIO fields
   * @example 4
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  /**
   * FK to dbo.KpiDefinitions
   * @example 10
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  kpiId?: number;

  /**
   * Updates dbo.KpiDefinitions.FrequencyId on the field's linked KPI.
   * Requires the field to have a KpiId (auto-created on POST when omitted).
   * @example 3
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  frequencyId?: number;

  /**
   * Recurring period start (YYYY-MM-DD). Stored on KpiDefinitions.ReferenceDate.
   * Send null to reset to 1 January.
   * @example "2026-02-01"
   */
  @ValidateIf((_, value: unknown) => value !== null)
  @IsOptional()
  @IsDateString()
  periodStartDate?: string | null;

  /**
   * Whether a value must be entered
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  /**
   * Minimum allowed value (NUMBER fields)
   * @example 0
   */
  @IsOptional()
  @IsNumber()
  minValue?: number;

  /**
   * Maximum allowed value (NUMBER fields)
   * @example 1000
   */
  @IsOptional()
  @IsNumber()
  maxValue?: number;

  /**
   * Minimum text length (TEXT fields)
   * @example 2
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  minLength?: number;

  /**
   * Maximum text length (TEXT fields)
   * @example 100
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  maxLength?: number;

  /**
   * Regular expression the value must match
   * @example "^[A-Za-z ]+$"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  regexPattern?: string;

  /**
   * Input placeholder in English
   * @example "Enter the full name of the applicant"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderEn?: string;

  /**
   * Input placeholder in Arabic
   * @example "أدخل الاسم الكامل لمقدم الطلب"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderAr?: string;

  /**
   * Value pre-filled when the form opens
   * @example ""
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  defaultValue?: string;

  /**
   * Help text shown under the field in English
   * @example "As written on the national ID"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextEn?: string;

  /**
   * Help text shown under the field in Arabic
   * @example "كما هو مكتوب في الهوية الوطنية"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextAr?: string;

  /**
   * Whether the field is displayed but not editable
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isReadOnly?: boolean;

  /**
   * Whether the field is shown on the form
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  /**
   * Updates dbo.KpiDefinitions.IsActive on the field's linked KPI — not a FormFields column.
   * Requires the field to have a KpiId (auto-created on POST when omitted).
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  /**
   * Validation error message in English
   * @example "Applicant name is required"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageEn?: string;

  /**
   * Validation error message in Arabic
   * @example "اسم مقدم الطلب مطلوب"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageAr?: string;
}
