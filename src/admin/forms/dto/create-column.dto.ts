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
  /**
   * Machine-readable key unique within the field — e.g. "QUANTITY"
   * @example "QUANTITY"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  columnKey!: string;

  /**
   * Column header in English
   * @example "Quantity"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelEn!: string;

  /**
   * Column header in Arabic
   * @example "الكمية"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  labelAr!: string;

  /**
   * 0-based display order within the table
   * @example 0
   */
  @IsInt()
  @Min(0)
  displayOrder!: number;

  /**
   * FK to dbo.DataTypes
   * @example 2
   */
  @IsInt()
  @IsPositive()
  dataTypeId!: number;

  /**
   * FK to dbo.ControlTypes
   * @example 1
   */
  @IsInt()
  @IsPositive()
  controlTypeId!: number;

  /**
   * FK to dbo.LookupTypes — required if column is a dropdown
   * @example 4
   */
  @IsOptional()
  @IsInt()
  @IsPositive()
  lookupTypeId?: number;

  /**
   * Whether a value is required in every cell of this column — stored as null when omitted
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}
