import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/** A single input variable used in the formula */
export class CreateCalculationInputDto {
  /**
   * Token used inside the formula expression to reference this input.
   * e.g. "A", "B", "QTY" — must be unique within the calculation.
   * @example "A"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  inputToken!: string;

  /**
   * Machine-readable column key — e.g. "QUANTITY"
   * @example "QUANTITY"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  columnKey!: string;

  /**
   * Input label in English
   * @example "Quantity"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn!: string;

  /**
   * Input label in Arabic
   * @example "الكمية"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr!: string;

  /**
   * FK to dbo.DataTypes
   * @example 2
   */
  @IsInt()
  @IsPositive()
  dataTypeId!: number;

  /**
   * FK to dbo.ControlTypes
   * @example 1
   */
  @IsInt()
  @IsPositive()
  controlTypeId!: number;

  /**
   * 0-based display order among the inputs
   * @example 0
   */
  @IsInt()
  @Min(0)
  displayOrder!: number;

  /**
   * Input placeholder in English
   * @example "Enter quantity"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderEn?: string;

  /**
   * Input placeholder in Arabic
   * @example "أدخل الكمية"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderAr?: string;

  /**
   * Whether a value must be entered
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  /**
   * Whether the input is displayed but not editable
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isReadOnly?: boolean;

  /**
   * Whether the input is shown
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  /**
   * Validation error message in English
   * @example "Quantity is required"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageEn?: string;

  /**
   * Validation error message in Arabic
   * @example "الكمية مطلوبة"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageAr?: string;
}

/** Calculation definition for CALCULATED control-type fields */
export class CreateCalculationDto {
  /**
   * Formula using input tokens — e.g. "A * B + C"
   * Tokens must match the `inputToken` values in `inputs`.
   * @example "A * B"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  formulaExpression!: string;

  /**
   * FK to dbo.DataTypes for the calculated result
   * @example 2
   */
  @IsInt()
  @IsPositive()
  resultDataTypeId!: number;

  /**
   * FK to dbo.ControlTypes for how the result is rendered
   * @example 1
   */
  @IsInt()
  @IsPositive()
  resultControlTypeId!: number;

  /**
   * Machine-readable key for the result column
   * @example "TOTAL_PRICE"
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  resultColumnKey?: string;

  /**
   * Result label in English
   * @example "Total Price"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  resultLabelEn?: string;

  /**
   * Result label in Arabic
   * @example "السعر الإجمالي"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  resultLabelAr?: string;

  /**
   * Decimal places for the result — defaults to 2
   * @example 2
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  resultPrecision?: number;

  /**
   * Calculate button label in English
   * @example "Calculate"
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  buttonLabelEn?: string;

  /**
   * Calculate button label in Arabic
   * @example "احسب"
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  buttonLabelAr?: string;

  /**
   * Help text in English
   * @example "Total price = quantity × unit price"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextEn?: string;

  /**
   * Help text in Arabic
   * @example "السعر الإجمالي = الكمية × سعر الوحدة"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextAr?: string;

  /**
   * Human-readable formula shown to users in English
   * @example "Quantity × Unit Price"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  displayFormulaEn?: string;

  /**
   * Human-readable formula shown to users in Arabic
   * @example "الكمية × سعر الوحدة"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  displayFormulaAr?: string;

  /** Input variables referenced in the formula — at least one required */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCalculationInputDto)
  inputs!: CreateCalculationInputDto[];
}
