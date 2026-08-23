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
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  inputToken: string;

  /** Machine-readable column key — e.g. "QUANTITY" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  columnKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr: string;

  /** FK to dbo.DataTypes */
  @IsInt()
  @IsPositive()
  dataTypeId: number;

  /** FK to dbo.ControlTypes */
  @IsInt()
  @IsPositive()
  controlTypeId: number;

  @IsInt()
  @Min(0)
  displayOrder: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeholderAr?: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

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

/** Calculation definition for CALCULATED control-type fields */
export class CreateCalculationDto {
  /**
   * Formula using input tokens — e.g. "A * B + C"
   * Tokens must match the `inputToken` values in `inputs`.
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  formulaExpression: string;

  /** FK to dbo.DataTypes for the calculated result */
  @IsInt()
  @IsPositive()
  resultDataTypeId: number;

  /** FK to dbo.ControlTypes for how the result is rendered */
  @IsInt()
  @IsPositive()
  resultControlTypeId: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  resultColumnKey?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  resultLabelEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  resultLabelAr?: string;

  /** Decimal places for the result — defaults to 2 */
  @IsOptional()
  @IsInt()
  @Min(0)
  resultPrecision?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  buttonLabelEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  buttonLabelAr?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextAr?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  displayFormulaEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  displayFormulaAr?: string;

  /** Input variables referenced in the formula — at least one required */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCalculationInputDto)
  inputs: CreateCalculationInputDto[];
}
