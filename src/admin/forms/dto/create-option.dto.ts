import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/** A single selectable option for DROPDOWN / RADIO / MULTI_SELECT fields */
export class CreateOptionDto {
  /**
   * Machine-readable key unique within the field — e.g. "OPTION_YES"
   * @example "OPTION_YES"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  optionKey!: string;

  /**
   * Option label in English
   * @example "Yes"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  optionLabelEn!: string;

  /**
   * Option label in Arabic
   * @example "نعم"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  optionLabelAr!: string;

  /**
   * Stored value submitted with the form
   * @example "YES"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  optionValue!: string;

  /**
   * 0-based display order within the field
   * @example 0
   */
  @IsInt()
  @Min(0)
  displayOrder!: number;

  /**
   * Whether the option is selectable
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
