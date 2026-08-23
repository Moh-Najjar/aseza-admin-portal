import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService, PaginatedUsers } from './users.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignDirectorateDto } from './dto/assign-directorate.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
// `import type` required: isolatedModules + emitDecoratorMetadata reject value-emitting of interfaces
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import { Users } from '../../entities/Users';
import { UserRoles } from '../../entities/UserRoles';

/** Apply JWT + ADMIN guard to every route in this controller */
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /admin/users
   * Paginated list of users with optional search and isActive filter.
   */
  @Get('users')
  getUsers(@Query() query: UsersQueryDto): Promise<PaginatedUsers> {
    return this.usersService.findAll(query);
  }

  /**
   * GET /admin/users/:userId/roles
   * Lists all role assignments for a specific user.
   */
  @Get('users/:userId/roles')
  getUserRoles(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserRoles[]> {
    return this.usersService.getUserRoles(userId);
  }

  /**
   * POST /admin/users/:userId/roles
   * Assigns a role to a user (idempotently refuses duplicate assignments).
   */
  @Post('users/:userId/roles')
  @HttpCode(HttpStatus.CREATED)
  assignRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: AssignRoleDto,
    @CurrentUser() admin: AuthenticatedUser,
  ): Promise<UserRoles> {
    return this.usersService.assignRole(userId, dto, admin);
  }

  /**
   * DELETE /admin/users/:userId/roles/:roleId
   * Removes a role assignment from a user.
   */
  @Delete('users/:userId/roles/:roleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<void> {
    return this.usersService.removeRole(userId, roleId);
  }

  /**
   * PUT /admin/users/:userId/directorate
   * Assigns or unassigns a directorate for a user.
   * Send { "directorateId": null } to unassign.
   */
  @Put('users/:userId/directorate')
  assignDirectorate(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: AssignDirectorateDto,
  ): Promise<Users> {
    return this.usersService.assignDirectorate(userId, dto);
  }

  /**
   * GET /admin/roles
   * Returns all available roles — used to populate role dropdowns in the UI.
   */
  @Get('roles')
  getAllRoles() {
    return this.usersService.findAllRoles();
  }
}
