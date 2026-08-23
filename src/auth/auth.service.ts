import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { Users } from '../entities/Users';
import { REDIS_CLIENT } from '../config/redis.config';
import { AuthenticatedUser } from './interfaces/jwt-payload.interface';

/** Shape of the successful login response */
export interface LoginResponse {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,

    private readonly jwtService: JwtService,

    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  /**
   * Validates admin credentials and returns a signed JWT.
   *
   * Strategy:
   *  1. Compare email & password against the ADMIN_EMAIL / ADMIN_PASSWORD env vars
   *     (no DB password stored — the admin password lives only in .env).
   *  2. Verify the user actually exists in dbo.Users and is active.
   *  3. Sign a JWT with the ADMIN role claim and a unique JTI for blacklisting.
   */
  async login(dto: LoginDto): Promise<LoginResponse> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        'ADMIN_EMAIL or ADMIN_PASSWORD environment variable is not set',
      );
    }

    // Constant-time string comparison avoids timing attacks
    const emailMatch = dto.email.toLowerCase() === adminEmail.toLowerCase();
    const passwordMatch = dto.password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Look up the user in dbo.Users to get their UserId for the JWT sub claim.
    // We search by email only — the password security is already handled above via
    // env-var comparison, so the DB record's IsActive flag is not a gate here.
    const user = await this.usersRepo.findOne({
      where: { email: adminEmail },
    });

    // Generate a unique token ID so individual tokens can be blacklisted on logout
    const jti = randomUUID();

    const payload = {
      // Fall back to 0 if the admin email has no matching row in dbo.Users yet
      sub: user ? user.userId : 0,
      email: adminEmail,
      role: 'ADMIN',
      jti,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  /**
   * Blacklists the token's JTI in Redis so it cannot be used again.
   * The key TTL matches the remaining lifetime of the token to avoid Redis bloat.
   */
  async logout(user: AuthenticatedUser): Promise<void> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    // Decode without verifying — we already know it's valid (came through JwtAuthGuard)
    const decoded = this.jwtService.decode<{ exp?: number }>(user.token);

    if (!decoded || typeof decoded !== 'object') {
      return; // Nothing to blacklist if decoding fails
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    const expirySeconds: number =
      typeof decoded.exp === 'number' ? decoded.exp : nowSeconds;
    // TTL = remaining lifetime in seconds; minimum 1 second to avoid Redis error
    const ttl = Math.max(expirySeconds - nowSeconds, 1);

    // Store the JTI with a TTL so Redis auto-expires the entry
    await this.redis.set(`blacklist:${user.jti}`, '1', 'EX', ttl);
  }
}
