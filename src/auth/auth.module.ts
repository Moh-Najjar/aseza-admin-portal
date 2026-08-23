import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Users } from '../entities/Users';
import { REDIS_CLIENT, createRedisClient } from '../config/redis.config';

@Module({
  imports: [
    // Register the Users repository so AuthService can query dbo.Users
    TypeOrmModule.forFeature([Users]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not set');
        }
        return {
          secret,
          signOptions: {
            // expiresIn as seconds (number) avoids the ms.StringValue branded-type mismatch.
            // Default: 3600 s (60 m). Override via JWT_EXPIRES_IN_SECONDS env var.
            expiresIn: parseInt(
              process.env.JWT_EXPIRES_IN_SECONDS ?? '3600',
              10,
            ),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,

    // Provide the ioredis client as a injectable token
    {
      provide: REDIS_CLIENT,
      useFactory: createRedisClient,
    },
  ],
  // Export so that other modules (e.g. admin modules) can reuse the Redis client
  exports: [REDIS_CLIENT, JwtModule, PassportModule],
})
export class AuthModule {}
