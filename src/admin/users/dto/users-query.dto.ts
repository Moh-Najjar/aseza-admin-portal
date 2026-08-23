import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UsersQueryDto {
  /** 1-based page number; defaults to 1 */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  /** Number of results per page; defaults to 20, max enforced in service */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageSize?: number = 20;

  /** Free-text filter applied to Username and Email (case-insensitive LIKE) */
  @IsOptional()
  @IsString()
  search?: string;

  /** When provided, filters by IsActive flag */
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;
}
