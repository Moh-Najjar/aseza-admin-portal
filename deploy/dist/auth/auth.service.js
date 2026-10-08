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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const crypto_1 = require("crypto");
const Users_1 = require("../entities/Users");
const redis_config_1 = require("../config/redis.config");
let AuthService = class AuthService {
    usersRepo;
    jwtService;
    redis;
    constructor(usersRepo, jwtService, redis) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
        this.redis = redis;
    }
    async login(dto) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) {
            throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD environment variable is not set');
        }
        const emailMatch = dto.email.toLowerCase() === adminEmail.toLowerCase();
        const passwordMatch = dto.password === adminPassword;
        if (!emailMatch || !passwordMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const user = await this.usersRepo.findOne({
            where: { email: adminEmail },
        });
        const jti = (0, crypto_1.randomUUID)();
        const payload = {
            sub: user ? user.userId : 0,
            email: adminEmail,
            role: 'ADMIN',
            jti,
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async logout(user) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        const decoded = this.jwtService.decode(user.token);
        if (!decoded || typeof decoded !== 'object') {
            return;
        }
        const nowSeconds = Math.floor(Date.now() / 1000);
        const expirySeconds = typeof decoded.exp === 'number' ? decoded.exp : nowSeconds;
        const ttl = Math.max(expirySeconds - nowSeconds, 1);
        await this.redis.set(`blacklist:${user.jti}`, '1', 'EX', ttl);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(2, (0, common_1.Inject)(redis_config_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        ioredis_1.default])
], AuthService);
//# sourceMappingURL=auth.service.js.map