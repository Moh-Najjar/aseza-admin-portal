import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Users } from '../../entities/Users';
import { Roles } from '../../entities/Roles';
import { UserRoles } from '../../entities/UserRoles';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignDirectorateDto } from './dto/assign-directorate.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';

/** Paginated users response shape — uses `items` so the outer ApiResponse wrapper stays clean */
export interface PaginatedUsers {
  items: Users[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,

    @InjectRepository(Roles)
    private readonly rolesRepo: Repository<Roles>,

    @InjectRepository(UserRoles)
    private readonly userRolesRepo: Repository<UserRoles>,
  ) {}

  /**
   * GET /admin/users
   * Returns a paginated, optionally filtered list of users.
   */
  async findAll(query: UsersQueryDto): Promise<PaginatedUsers> {
    const page = query.page ?? 1;
    // Cap pageSize at 100 to prevent unbounded queries
    const pageSize = Math.min(query.pageSize ?? 20, 100);

    const where: Parameters<Repository<Users>['findAndCount']>[0] = {};

    // Build case-insensitive search filter
    if (query.search) {
      // TypeORM ILike is supported on MSSQL via LIKE with case-insensitive collation
      Object.assign(where, [
        { username: ILike(`%${query.search}%`) },
        { email: ILike(`%${query.search}%`) },
      ]);
    }

    // Build isActive filter (only when explicitly provided)
    const baseWhere =
      query.isActive !== undefined ? { isActive: query.isActive } : {};

    // When we have a search term we need OR conditions combined with isActive
    const finalWhere = query.search
      ? [
          { username: ILike(`%${query.search}%`), ...baseWhere },
          { email: ILike(`%${query.search}%`), ...baseWhere },
        ]
      : { ...baseWhere };

    const [data, total] = await this.usersRepo.findAndCount({
      where: finalWhere,
      // TypeORM 1.x requires the object form for relations (string arrays removed)
      relations: { directorate: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { userId: 'ASC' },
    });

    return {
      items: data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * GET /admin/users/:userId/roles
   * Returns all role assignments for a specific user.
   */
  async getUserRoles(userId: number): Promise<UserRoles[]> {
    await this.assertUserExists(userId);

    return this.userRolesRepo.find({
      where: { userId },
      relations: { role: true },
      order: { assignedAt: 'DESC' },
    });
  }

  /**
   * POST /admin/users/:userId/roles
   * Assigns a role to a user. Throws ConflictException if already assigned.
   */
  async assignRole(
    userId: number,
    dto: AssignRoleDto,
    admin: AuthenticatedUser,
  ): Promise<UserRoles> {
    await this.assertUserExists(userId);
    await this.assertRoleExists(dto.roleId);

    // Prevent duplicate assignments
    const existing = await this.userRolesRepo.findOne({
      where: { userId, roleId: dto.roleId },
    });

    if (existing) {
      throw new ConflictException(
        `User ${userId} already has role ${dto.roleId}`,
      );
    }

    const assignment = this.userRolesRepo.create({
      // Set the FK via the relation object — generated entity has no raw assignedByUserId column
      user: { userId } as Users,
      role: { roleId: dto.roleId } as Roles,
      assignedByUser: { userId: admin.userId } as Users,
    });

    return this.userRolesRepo.save(assignment);
  }

  /**
   * DELETE /admin/users/:userId/roles/:roleId
   * Removes a role assignment. Throws NotFoundException if the assignment does not exist.
   */
  async removeRole(userId: number, roleId: number): Promise<void> {
    await this.assertUserExists(userId);

    const assignment = await this.userRolesRepo.findOne({
      where: { userId, roleId },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Role ${roleId} is not assigned to user ${userId}`,
      );
    }

    await this.userRolesRepo.remove(assignment);
  }

  /**
   * PUT /admin/users/:userId/directorate
   * Updates (or clears) the directorate assignment for a user.
   */
  async assignDirectorate(
    userId: number,
    dto: AssignDirectorateDto,
  ): Promise<Users> {
    const user = await this.usersRepo.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // null means "unassign" — set the FK to null
    user.directorateId = dto.directorateId;
    return this.usersRepo.save(user);
  }

  /**
   * GET /admin/roles
   * Returns all roles — used for dropdowns in the admin UI.
   */
  async findAllRoles(): Promise<Roles[]> {
    return this.rolesRepo.find({ order: { roleId: 'ASC' } });
  }

  // ---------- private helpers ----------

  private async assertUserExists(userId: number): Promise<void> {
    const exists = await this.usersRepo.existsBy({ userId });
    if (!exists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  private async assertRoleExists(roleId: number): Promise<void> {
    const exists = await this.rolesRepo.existsBy({ roleId });
    if (!exists) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }
  }
}
