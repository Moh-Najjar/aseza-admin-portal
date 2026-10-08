import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService, LoginResponse } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
// `import type` required: isolatedModules + emitDecoratorMetadata reject value-emitting of interfaces
import type { AuthenticatedUser } from './interfaces/jwt-payload.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   * Accepts admin credentials, validates them, and returns a signed JWT.
   */
  @ApiOperation({
    summary: 'Validates admin credentials and returns a signed JWT.',
    description:
      'Copy `accessToken` into the Authorize button to call protected endpoints.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(dto);
  }

  /**
   * POST /auth/logout
   * Blacklists the current Bearer token in Redis so it cannot be reused.
   * Requires a valid JWT — the user must already be logged in to log out.
   */
  @ApiOperation({
    summary:
      'Blacklists the current Bearer token in Redis so it cannot be reused.',
  })
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async logout(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.authService.logout(user);
  }
}
