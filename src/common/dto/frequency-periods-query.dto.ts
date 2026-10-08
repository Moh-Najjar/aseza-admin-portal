import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';

/** Query params for generating calendar windows from a frequency code. */
export class FrequencyPeriodsQueryDto {
  /**
   * Calendar year (UTC). Defaults to the current UTC year when omitted.
   * @example 2026
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  year?: number;

  /**
   * Optional 1–12 month filter.
   * Useful for DAILY / WEEKLY / MONTHLY so the list stays small.
   * @example 3
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  /**
   * Preview offset without saving — YYYY-MM-DD, month+day only matter.
   * Example: 2026-02-01 with ANNUALLY → 1 Feb through 31 Jan next year.
   * @example "2026-02-01"
   */
  @IsOptional()
  @IsDateString()
  periodStartDate?: string;
}
