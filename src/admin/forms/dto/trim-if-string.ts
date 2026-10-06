import { TransformFnParams } from 'class-transformer';

/** Trims string inputs; leaves other types untouched so @IsString can still reject them. */
export function trimIfString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

/** ValidateIf predicate: validate only when the property was sent (null is validated and rejected). */
export function isProvided(_object: object, value: unknown): boolean {
  return value !== undefined;
}
