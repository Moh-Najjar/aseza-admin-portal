import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFormDto {
  /** Machine-readable unique key, e.g. "PERMIT_REQUEST" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  formKey!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nameEn!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nameAr!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionAr?: string;

  /** FK to dbo.Directorates — the directorate that owns this form */
  @IsOptional()
  @IsInt()
  @IsPositive()
  directorateId?: number;

  /** FK to dbo.Frequencies — how often this form is submitted */
  @IsOptional()
  @IsInt()
  @IsPositive()
  frequencyId?: number;

  /** ISO 8601 date string e.g. "2026-01-01" */
  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;

  @IsOptional()
  @IsDateString()
  effectiveTo?: string;

  /** Defaults to true if omitted */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
