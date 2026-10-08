import { Users } from './Users';
export declare class UserSessions {
    id: string;
    userId: number;
    refreshToken: string;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
    lastActivityAt: Date | null;
    expiresAt: Date;
    isActive: boolean;
    revokedAt: Date | null;
    revokedReason: string | null;
    user: Users;
}
