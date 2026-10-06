import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';

/** Assigns a catalog frequency, optionally with a recurring period start date. */
export class AssignFieldFrequencyDto {
  /** FK to dbo.Frequencies — e.g. MONTHLY, QUARTERLY, ANNUALLY, ON_DEMAND */
  @IsInt()
  @IsPositive()
  frequencyId: number;

  /**
   * Recurring period start stored on dbo.KpiDefinitions.ReferenceDate.
   * Only the month and day are used each year.
   * Example: "2026-02-01" + ANNUALLY → 1 Feb 2026 through 31 Jan 2027.
   * Send null to reset to the default calendar (1 January).
   */
  @ValidateIf((_, value: unknown) => value !== null)
  @IsOptional()
  @IsDateString()
  periodStartDate?: string | null;
}
