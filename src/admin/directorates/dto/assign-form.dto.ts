import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class AssignFormDto {
  /**
   * Primary key of the form to grant/update access for
   * @example 5
   */
  @IsInt({ message: 'formId must be an integer' })
  @IsPositive({ message: 'formId must be a positive number' })
  formId: number;

  /**
   * Whether users of this directorate can view submissions for this form
   * @example true
   */
  @IsBoolean({ message: 'canView must be a boolean' })
  canView: boolean;

  /**
   * Whether users of this directorate can submit this form
   * @example true
   */
  @IsBoolean({ message: 'canSubmit must be a boolean' })
  canSubmit: boolean;

  /**
   * Whether users of this directorate can approve submissions for this form
   * @example false
   */
  @IsBoolean({ message: 'canApprove must be a boolean' })
  canApprove: boolean;
}
