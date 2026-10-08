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
 * Partial update for a TABLE / GRID column.
 * Keys, types, lookup and display order are not editable — they would break stored submission values.
 * Unknown or forbidden properties are rejected by the global ValidationPipe (forbidNonWhitelisted).
 * Omitted properties are skipped; explicit null is rejected.
 */
export class UpdateColumnDto {
  /**
   * Column header in English
   * @example "Quantity"
   */
  @ValidateIf(isProvided)
  @Transform(trimIfString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn?: string;

  /**
   * Column header in Arabic
   * @example "الكمية"
   */
  @ValidateIf(isProvided)
  @Transform(trimIfString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr?: string;

  /**
   * Whether a value is required in every cell of this column
   * @example true
   */
  @ValidateIf(isProvided)
  @IsBoolean()
  isRequired?: boolean;
}
