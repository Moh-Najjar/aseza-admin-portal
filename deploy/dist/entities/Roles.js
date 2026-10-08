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
exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const ExternalGroupRoleMapping_1 = require("./ExternalGroupRoleMapping");
const UserRoles_1 = require("./UserRoles");
let Roles = class Roles {
    roleId;
    roleKey;
    roleName;
    description;
    isActive;
    createdAt;
    externalGroupRoleMappings;
    userRoles;
};
exports.Roles = Roles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'RoleId' }),
    __metadata("design:type", Number)
], Roles.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RoleKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], Roles.prototype, "roleKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RoleName', length: 150 }),
    __metadata("design:type", String)
], Roles.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Description', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], Roles.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], Roles.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], Roles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExternalGroupRoleMapping_1.ExternalGroupRoleMapping, (externalGroupRoleMapping) => externalGroupRoleMapping.role),
    __metadata("design:type", Array)
], Roles.prototype, "externalGroupRoleMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoles_1.UserRoles, (userRoles) => userRoles.role),
    __metadata("design:type", Array)
], Roles.prototype, "userRoles", void 0);
exports.Roles = Roles = __decorate([
    (0, typeorm_1.Index)('PK__Roles__8AFACE1A4D10D48A', ['roleId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__Roles__D0EBA515D9D1925A', ['roleKey'], { unique: true }),
    (0, typeorm_1.Entity)('Roles', { schema: 'dbo' })
], Roles);
//# sourceMappingURL=Roles.js.map