import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/** All fields optional — only provided fields are updated (PATCH semantics) */
export class UpdateFieldDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  labelEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  labelAr?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  dataTypeId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  controlTypeId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  displayOrder?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  kpiId?: number;

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

  /**
   * Updates dbo.KpiDefinitions.IsActive on the field's linked KPI — not a FormFields column.
   * Requires the field to have a KpiId (auto-created on POST when omitted).
   */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  validationMessageAr?: string;
}
