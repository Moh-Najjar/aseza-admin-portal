import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { LoginDto } from './dto/login.dto';
import { Users } from '../entities/Users';
import { AuthenticatedUser } from './interfaces/jwt-payload.interface';
export interface LoginResponse {
    accessToken: string;
}
export declare class AuthService {
    private readonly usersRepo;
    private readonly jwtService;
    private readonly redis;
    constructor(usersRepo: Repository<Users>, jwtService: JwtService, redis: Redis);
    login(dto: LoginDto): Promise<LoginResponse>;
    logout(user: AuthenticatedUser): Promise<void>;
}
