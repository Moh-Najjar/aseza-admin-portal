import { AuthService, LoginResponse } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { AuthenticatedUser } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<LoginResponse>;
    logout(user: AuthenticatedUser): Promise<void>;
}
