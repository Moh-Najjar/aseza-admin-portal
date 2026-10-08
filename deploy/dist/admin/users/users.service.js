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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Users_1 = require("../../entities/Users");
const Roles_1 = require("../../entities/Roles");
const UserRoles_1 = require("../../entities/UserRoles");
let UsersService = class UsersService {
    usersRepo;
    rolesRepo;
    userRolesRepo;
    constructor(usersRepo, rolesRepo, userRolesRepo) {
        this.usersRepo = usersRepo;
        this.rolesRepo = rolesRepo;
        this.userRolesRepo = userRolesRepo;
    }
    async findAll(query) {
        const page = query.page ?? 1;
        const pageSize = Math.min(query.pageSize ?? 20, 100);
        const where = {};
        if (query.search) {
            Object.assign(where, [
                { username: (0, typeorm_2.ILike)(`%${query.search}%`) },
                { email: (0, typeorm_2.ILike)(`%${query.search}%`) },
            ]);
        }
        const baseWhere = query.isActive !== undefined ? { isActive: query.isActive } : {};
        const finalWhere = query.search
            ? [
                { username: (0, typeorm_2.ILike)(`%${query.search}%`), ...baseWhere },
                { email: (0, typeorm_2.ILike)(`%${query.search}%`), ...baseWhere },
            ]
            : { ...baseWhere };
        const [data, total] = await this.usersRepo.findAndCount({
            where: finalWhere,
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
    async getUserRoles(userId) {
        await this.assertUserExists(userId);
        return this.userRolesRepo.find({
            where: { userId },
            relations: { role: true },
            order: { assignedAt: 'DESC' },
        });
    }
    async assignRole(userId, dto, admin) {
        await this.assertUserExists(userId);
        await this.assertRoleExists(dto.roleId);
        const existing = await this.userRolesRepo.findOne({
            where: { userId, roleId: dto.roleId },
        });
        if (existing) {
            throw new common_1.ConflictException(`User ${userId} already has role ${dto.roleId}`);
        }
        const assignment = this.userRolesRepo.create({
            user: { userId },
            role: { roleId: dto.roleId },
            assignedByUser: { userId: admin.userId },
        });
        return this.userRolesRepo.save(assignment);
    }
    async removeRole(userId, roleId) {
        await this.assertUserExists(userId);
        const assignment = await this.userRolesRepo.findOne({
            where: { userId, roleId },
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`Role ${roleId} is not assigned to user ${userId}`);
        }
        await this.userRolesRepo.remove(assignment);
    }
    async assignDirectorate(userId, dto) {
        const user = await this.usersRepo.findOne({ where: { userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        user.directorateId = dto.directorateId;
        return this.usersRepo.save(user);
    }
    async findAllRoles() {
        return this.rolesRepo.find({ order: { roleId: 'ASC' } });
    }
    async assertUserExists(userId) {
        const exists = await this.usersRepo.existsBy({ userId });
        if (!exists) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
    }
    async assertRoleExists(roleId) {
        const exists = await this.rolesRepo.existsBy({ roleId });
        if (!exists) {
            throw new common_1.NotFoundException(`Role with id ${roleId} not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(Roles_1.Roles)),
    __param(2, (0, typeorm_1.InjectRepository)(UserRoles_1.UserRoles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map