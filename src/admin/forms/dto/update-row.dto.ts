import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { isProvided, trimIfString } from './trim-if-string';

/**
 * Partial update for a TABLE / GRID row.
 * RowKey and display order are not editable — they would break stored submission values.
 * Unknown or forbidden properties are rejected by the global ValidationPipe (forbidNonWhitelisted).
 * Omitted properties are skipped; explicit null is rejected.
 */
export class UpdateRowDto {
  /**
   * Row label in English
   * @example "Total"
   */
  @ValidateIf(isProvided)
  @Transform(trimIfString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  labelEn?: string;

  /**
   * Row label in Arabic
   * @example "المجموع"
   */
  @ValidateIf(isProvided)
  @Transform(trimIfString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  labelAr?: string;

  /**
   * Whether every cell in this row must be filled
   * @example false
   */
  @ValidateIf(isProvided)
  @IsBoolean()
  isRequired?: boolean;
}
