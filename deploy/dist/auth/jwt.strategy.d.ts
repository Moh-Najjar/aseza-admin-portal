import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import Redis from 'ioredis';
import { JwtPayload, AuthenticatedUser } from './interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly redis;
    constructor(redis: Redis);
    validate(req: Request, payload: JwtPayload): Promise<AuthenticatedUser>;
}
export {};
