"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_config_1 = require("../config/redis.config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    redis;
    constructor(redis) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
            passReqToCallback: true,
        });
        this.redis = redis;
    }
    async validate(req, payload) {
        const authHeader = req.headers.authorization;
        const rawToken = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : null;
        if (!rawToken) {
            throw new common_1.UnauthorizedException('No bearer token provided');
        }
        try {
            const blacklisted = await this.redis.get(`blacklist:${payload.jti}`);
            if (blacklisted !== null) {
                throw new common_1.UnauthorizedException('Token has been revoked');
            }
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                throw err;
            }
            console.warn('[JwtStrategy] Redis unavailable, skipping blacklist check:', err instanceof Error ? err.message : String(err));
        }
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
            jti: payload.jti,
            token: rawToken,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_config_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [ioredis_1.default])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map