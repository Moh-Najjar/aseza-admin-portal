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
  /**
   * Machine-readable key, unique within the form — e.g. "APPLICANT_NAME"
   * @example "APPLICANT_NAME"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fieldKey!: string;

  /**
   * Field label in English
   * @example "Applicant Name"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn!: string;

  /**
   * Field label in Arabic
   * @example "اسم مقدم الطلب"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr!: string;

  /**
   * FK to dbo.DataTypes — e.g. TEXT, NUMBER, DATE, BOOLEAN
   * @example 1
   */
  @IsInt()
  @IsPositive()
  dataTypeId!: number;

  /**
   * FK to dbo.ControlTypes — e.g. TEXTBOX, DROPDOWN, CHECKBOX, DATE_PICKER,
   * TABLE, CALCULATED
   * @example 1
   */
  @IsInt()
  @IsPositive()
  controlTypeId!: number;

  /**
   * 1-based display order within the form
   * @example 1
   */
  @IsInt()
  @Min(1)
  displayOrder!: number;

  /**
   * FK to dbo.LookupTypes — required when controlType is DROPDOWN or RADIO
   * @example 4
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  /**
   * FK to dbo.KpiDefinitions — optional; auto-created from form + field labels when omitted
   * @example 10
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  kpiId?: number;

  /**
   * FK to dbo.Frequencies — how often this field's KPI is reported.
   * Applied to the linked/auto-created KpiDefinitions row.
   * Falls back to the parent form's frequencyId when omitted.
   * @example 3
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  frequencyId?: number;

  /**
   * Recurring period start (YYYY-MM-DD). Stored on KpiDefinitions.ReferenceDate.
   * Example: "2026-02-01" with ANNUALLY = first of February every year.
   * @example "2026-02-01"
   */
  @IsOptional()
  @IsDateString()
  periodStartDate?: string;

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
