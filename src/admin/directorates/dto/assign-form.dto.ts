import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class AssignFormDto {
  /** Primary key of the form to grant/update access for */
  @IsInt({ message: 'formId must be an integer' })
  @IsPositive({ message: 'formId must be a positive number' })
  formId: number;

  /** Whether users of this directorate can view submissions for this form */
  @IsBoolean({ message: 'canView must be a boolean' })
  canView: boolean;

  /** Whether users of this directorate can submit this form */
  @IsBoolean({ message: 'canSubmit must be a boolean' })
  canSubmit: boolean;

  /** Whether users of this directorate can approve submissions for this form */
  @IsBoolean({ message: 'canApprove must be a boolean' })
  canApprove: boolean;
}
