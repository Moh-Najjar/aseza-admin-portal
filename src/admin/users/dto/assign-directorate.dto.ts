import { IsInt, IsPositive, IsOptional, ValidateIf } from 'class-validator';

export class AssignDirectorateDto {
  /**
   * ID of the directorate to assign.
   * Send null (or omit entirely) to remove the current assignment.
   * @example 3
   */
  @ValidateIf((o: AssignDirectorateDto) => o.directorateId !== null)
  @IsOptional()
  @IsInt({ message: 'directorateId must be an integer' })
  @IsPositive({ message: 'directorateId must be a positive number' })
  directorateId: number | null;
}
