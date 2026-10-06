import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/** A column definition for TABLE / GRID control-type fields */
export class CreateColumnDto {
  /** Machine-readable key unique within the field — e.g. "QUANTITY" */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  columnKey!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr!: string;

  @IsInt()
  @Min(0)
  displayOrder!: number;

  /** FK to dbo.DataTypes */
  @IsInt()
  @IsPositive()
  dataTypeId!: number;

  /** FK to dbo.ControlTypes */
  @IsInt()
  @IsPositive()
  controlTypeId!: number;

  /** FK to dbo.LookupTypes — required if column is a dropdown */
  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  /** Whether a value is required in every cell of this column — stored as null when omitted */
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}
