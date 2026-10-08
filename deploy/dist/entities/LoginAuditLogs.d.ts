import { Users } from './Users';
export declare class LoginAuditLogs {
    id: string;
    userId: number | null;
    username: string | null;
    email: string | null;
    ipAddress: string;
    userAgent: string;
    isSuccessful: boolean;
    failureReason: string | null;
    attemptedAt: Date;
    user: Users;
}
