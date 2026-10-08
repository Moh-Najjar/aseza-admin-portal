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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Roles_1 = require("./Roles");
let UserRoles = class UserRoles {
    userRoleId;
    userId;
    roleId;
    assignedAt;
    user;
    role;
    assignedByUser;
};
exports.UserRoles = UserRoles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'UserRoleId' }),
    __metadata("design:type", Number)
], UserRoles.prototype, "userRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'UserId', unique: true }),
    __metadata("design:type", Number)
], UserRoles.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'RoleId', unique: true }),
    __metadata("design:type", Number)
], UserRoles.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', {
        name: 'AssignedAt',
        default: () => 'sysutcdatetime()',
    }),
    __metadata("design:type", Date)
], UserRoles.prototype, "assignedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.userRoles),
    (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], UserRoles.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (roles) => roles.userRoles),
    (0, typeorm_1.JoinColumn)([{ name: 'RoleId', referencedColumnName: 'roleId' }]),
    __metadata("design:type", Roles_1.Roles)
], UserRoles.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.userRoles2),
    (0, typeorm_1.JoinColumn)([{ name: 'AssignedByUserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], UserRoles.prototype, "assignedByUser", void 0);
exports.UserRoles = UserRoles = __decorate([
    (0, typeorm_1.Index)('PK__UserRole__3D978A35A884A9B1', ['userRoleId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_UserRoles_User_Role', ['userId', 'roleId'], { unique: true }),
    (0, typeorm_1.Entity)('UserRoles', { schema: 'dbo' })
], UserRoles);
//# sourceMappingURL=UserRoles.js.map