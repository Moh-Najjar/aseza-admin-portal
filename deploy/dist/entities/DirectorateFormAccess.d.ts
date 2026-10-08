import { Directorates } from './Directorates';
import { Forms } from './Forms';
import { Users } from './Users';
export declare class DirectorateFormAccess {
    accessId: number;
    directorateId: number;
    formId: number;
    canView: boolean;
    canSubmit: boolean;
    canApprove: boolean;
    grantedAt: Date;
    directorate: Directorates;
    form: Forms;
    grantedBy: Users;
}
