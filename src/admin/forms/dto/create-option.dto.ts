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
  /** Machine-readable key unique within the field — e.g. "OPTION_YES" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  optionKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  optionLabelEn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  optionLabelAr: string;

  /** Stored value submitted with the form */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  optionValue: string;

  @IsInt()
  @Min(0)
  displayOrder: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
