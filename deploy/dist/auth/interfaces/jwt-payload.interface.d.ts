export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
    jti: string;
    iat?: number;
    exp?: number;
}
export interface AuthenticatedUser {
    userId: number;
    email: string;
    role: string;
    jti: string;
    token: string;
}
