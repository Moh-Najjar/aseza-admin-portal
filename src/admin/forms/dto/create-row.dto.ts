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
  /**
   * Machine-readable key unique within the field — e.g. "ROW_TOTAL"
   * @example "ROW_TOTAL"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  rowKey!: string;

  /**
   * Row label in English
   * @example "Total"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  labelEn!: string;

  /**
   * Row label in Arabic
   * @example "المجموع"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  labelAr?: string;

  /**
   * 0-based display order within the table
   * @example 0
   */
  @IsInt()
  @Min(0)
  displayOrder!: number;

  /**
   * Whether every cell in this row must be filled
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  /**
   * Whether the row is displayed but not editable
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  isReadOnly?: boolean;

  /**
   * Whether the row is shown in the table
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  /**
   * Value pre-filled in the row's cells
   * @example "0"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  defaultValue?: string;

  /**
   * Cell placeholder in English
   * @example "Enter a value"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  placeholderEn?: string;

  /**
   * Cell placeholder in Arabic
   * @example "أدخل قيمة"
   */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  placeholderAr?: string;

  /**
   * Help text for the row in English
   * @example "Sum of all quarters"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextEn?: string;

  /**
   * Help text for the row in Arabic
   * @example "مجموع جميع الأرباع"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  helpTextAr?: string;

  /**
   * Validation error message in English
   * @example "This row is required"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  validationMessageEn?: string;

  /**
   * Validation error message in Arabic
   * @example "هذا الصف مطلوب"
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  validationMessageAr?: string;
}
