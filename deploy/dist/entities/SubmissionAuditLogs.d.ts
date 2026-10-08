import { FormSubmissions } from './FormSubmissions';
import { Users } from './Users';
export declare class SubmissionAuditLogs {
    auditId: string;
    actionType: string;
    fieldKey: string | null;
    oldValue: string | null;
    newValue: string | null;
    actionAt: Date;
    comment: string | null;
    ipAddress: string | null;
    submission: FormSubmissions;
    actionByUser: Users;
}
