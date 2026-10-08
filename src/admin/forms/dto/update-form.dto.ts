import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

/** All fields are optional — only provided fields are updated */
export class UpdateFormDto {
  /**
   * Form name in English
   * @example "Permit Request"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameEn?: string;

  /**
   * Form name in Arabic
   * @example "طلب تصريح"
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameAr?: string;

  /**
   * Form description in English
   * @example "Monthly permit request submitted by each directorate"
   */
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionEn?: string;

  /**
   * Form description in Arabic
   * @example "طلب تصريح شهري تقدمه كل مديرية"
   */
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionAr?: string;

  /**
   * FK to dbo.Directorates — the directorate that owns this form
   * @example 1
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  directorateId?: number;

  /**
   * FK to dbo.Frequencies — how often this form is submitted
   * @example 3
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  frequencyId?: number;

  /**
   * ISO 8601 date string
   * @example "2026-01-01"
   */
  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;

  /**
   * ISO 8601 date string
   * @example "2026-12-31"
   */
  @IsOptional()
  @IsDateString()
  effectiveTo?: string;

  /**
   * Whether the form is active
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
