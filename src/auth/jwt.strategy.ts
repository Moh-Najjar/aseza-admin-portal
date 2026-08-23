import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import Redis from 'ioredis';
import {
  JwtPayload,
  AuthenticatedUser,
} from './interfaces/jwt-payload.interface';
import { REDIS_CLIENT } from '../config/redis.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    super({
      // Extract the Bearer token from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject tokens that have passed their expiry time
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      // Pass the raw request so we can extract the token string for blacklist check
      passReqToCallback: true,
    });
  }

  /**
   * Called by Passport after signature verification passes.
   * Checks the Redis blacklist before allowing access.
   *
   * @param req  - The raw Express request (needed to extract the raw token)
   * @param payload - Decoded and verified JWT payload
   */
  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<AuthenticatedUser> {
    // Extract the raw token from the Authorization header
    const authHeader = req.headers.authorization;
    const rawToken =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!rawToken) {
      throw new UnauthorizedException('No bearer token provided');
    }

    // Check if this token's JTI has been blacklisted (i.e. the user logged out).
    // If Redis is unavailable, log a warning and allow the request through —
    // a down Redis is not a reason to lock out every user.
    try {
      const blacklisted = await this.redis.get(`blacklist:${payload.jti}`);
      if (blacklisted !== null) {
        throw new UnauthorizedException('Token has been revoked');
      }
    } catch (err: unknown) {
      // Re-throw our own 401 (token revoked) without swallowing it
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      // Redis connection error — warn and continue
      console.warn(
        '[JwtStrategy] Redis unavailable, skipping blacklist check:',
        err instanceof Error ? err.message : String(err),
      );
    }

    // Return the user object that will be attached to request.user
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      jti: payload.jti,
      token: rawToken,
    };
  }
}
