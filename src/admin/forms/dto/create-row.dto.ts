import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/** A row definition for TABLE / GRID control-type fields */
export class CreateRowDto {
  /** Machine-readable key unique within the field — e.g. "ROW_TOTAL" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  rowKey!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  labelEn!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  labelAr?: string;

  @IsInt()
  @Min(0)
  displayOrder!: number;

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
  @MaxLength(500)
  defaultValue?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  placeholderEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  placeholderAr?: string;

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
  validationMessageEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  validationMessageAr?: string;
}
