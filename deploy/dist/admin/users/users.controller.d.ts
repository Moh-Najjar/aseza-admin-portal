import { UsersService, PaginatedUsers } from './users.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignDirectorateDto } from './dto/assign-directorate.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import { Users } from '../../entities/Users';
import { UserRoles } from '../../entities/UserRoles';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(query: UsersQueryDto): Promise<PaginatedUsers>;
    getUserRoles(userId: number): Promise<UserRoles[]>;
    assignRole(userId: number, dto: AssignRoleDto, admin: AuthenticatedUser): Promise<UserRoles>;
    removeRole(userId: number, roleId: number): Promise<void>;
    assignDirectorate(userId: number, dto: AssignDirectorateDto): Promise<Users>;
    getAllRoles(): Promise<import("../../entities/Roles").Roles[]>;
}
