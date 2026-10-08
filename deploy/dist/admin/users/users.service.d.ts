import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { Roles } from '../../entities/Roles';
import { UserRoles } from '../../entities/UserRoles';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignDirectorateDto } from './dto/assign-directorate.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
export interface PaginatedUsers {
    items: Users[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export declare class UsersService {
    private readonly usersRepo;
    private readonly rolesRepo;
    private readonly userRolesRepo;
    constructor(usersRepo: Repository<Users>, rolesRepo: Repository<Roles>, userRolesRepo: Repository<UserRoles>);
    findAll(query: UsersQueryDto): Promise<PaginatedUsers>;
    getUserRoles(userId: number): Promise<UserRoles[]>;
    assignRole(userId: number, dto: AssignRoleDto, admin: AuthenticatedUser): Promise<UserRoles>;
    removeRole(userId: number, roleId: number): Promise<void>;
    assignDirectorate(userId: number, dto: AssignDirectorateDto): Promise<Users>;
    findAllRoles(): Promise<Roles[]>;
    private assertUserExists;
    private assertRoleExists;
}
