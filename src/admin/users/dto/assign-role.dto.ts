import { IsInt, IsPositive } from 'class-validator';

export class AssignRoleDto {
  /**
   * Primary key of the role to assign — must match a row in dbo.Roles
   * @example 1
   */
  @IsInt({ message: 'roleId must be an integer' })
  @IsPositive({ message: 'roleId must be a positive number' })
  roleId: number;
}
