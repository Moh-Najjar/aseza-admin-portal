import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

/** Conditional show/hide/require rule between two fields */
export class CreateDependencyDto {
  /** The field whose value triggers this rule */
  @IsInt()
  @IsPositive()
  dependsOnFieldId!: number;

  /**
   * Comparison operator applied to the trigger field's value.
   * Accepted: EQ | NEQ | GT | GTE | LT | LTE | CONTAINS | IS_EMPTY | IS_NOT_EMPTY
   */
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'EQ',
    'NEQ',
    'GT',
    'GTE',
    'LT',
    'LTE',
    'CONTAINS',
    'IS_EMPTY',
    'IS_NOT_EMPTY',
  ])
  conditionOperator!: string;

  /** The value to compare against (ignored for IS_EMPTY / IS_NOT_EMPTY) */
  @IsString()
  @MaxLength(200)
  conditionValue!: string;

  /**
   * What to do when the condition is met.
   * Accepted: SHOW | HIDE | REQUIRE | DISABLE
   */
  @IsString()
  @IsIn(['SHOW', 'HIDE', 'REQUIRE', 'DISABLE'])
  action!: string;
}
