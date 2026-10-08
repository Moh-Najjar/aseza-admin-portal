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
exports.ExternalGroupRoleMapping = void 0;
const typeorm_1 = require("typeorm");
const Roles_1 = require("./Roles");
let ExternalGroupRoleMapping = class ExternalGroupRoleMapping {
    id;
    groupObjectId;
    groupKey;
    groupNameEn;
    groupNameAr;
    isActive;
    createdAt;
    role;
};
exports.ExternalGroupRoleMapping = ExternalGroupRoleMapping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'Id' }),
    __metadata("design:type", Number)
], ExternalGroupRoleMapping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'GroupObjectId', length: 100 }),
    __metadata("design:type", String)
], ExternalGroupRoleMapping.prototype, "groupObjectId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'GroupKey', length: 100 }),
    __metadata("design:type", String)
], ExternalGroupRoleMapping.prototype, "groupKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'GroupNameEn', length: 200 }),
    __metadata("design:type", String)
], ExternalGroupRoleMapping.prototype, "groupNameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'GroupNameAr', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], ExternalGroupRoleMapping.prototype, "groupNameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], ExternalGroupRoleMapping.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysdatetime()' }),
    __metadata("design:type", Date)
], ExternalGroupRoleMapping.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (roles) => roles.externalGroupRoleMappings),
    (0, typeorm_1.JoinColumn)([{ name: 'RoleId', referencedColumnName: 'roleId' }]),
    __metadata("design:type", Roles_1.Roles)
], ExternalGroupRoleMapping.prototype, "role", void 0);
exports.ExternalGroupRoleMapping = ExternalGroupRoleMapping = __decorate([
    (0, typeorm_1.Index)('PK__External__3214EC0735B4077A', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('ExternalGroupRoleMapping', { schema: 'dbo' })
], ExternalGroupRoleMapping);
//# sourceMappingURL=ExternalGroupRoleMapping.js.map