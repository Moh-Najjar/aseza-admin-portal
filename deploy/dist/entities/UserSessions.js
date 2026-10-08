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
exports.UserSessions = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UserSessions = class UserSessions {
    id;
    userId;
    refreshToken;
    ipAddress;
    userAgent;
    createdAt;
    lastActivityAt;
    expiresAt;
    isActive;
    revokedAt;
    revokedReason;
    user;
};
exports.UserSessions = UserSessions;
__decorate([
    (0, typeorm_1.Column)('uniqueidentifier', { primary: true, name: 'Id' }),
    __metadata("design:type", String)
], UserSessions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'UserId' }),
    __metadata("design:type", Number)
], UserSessions.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RefreshToken', length: 500 }),
    __metadata("design:type", String)
], UserSessions.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'IpAddress', length: 50 }),
    __metadata("design:type", String)
], UserSessions.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'UserAgent', length: 500 }),
    __metadata("design:type", String)
], UserSessions.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], UserSessions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'LastActivityAt', nullable: true }),
    __metadata("design:type", Object)
], UserSessions.prototype, "lastActivityAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'ExpiresAt' }),
    __metadata("design:type", Date)
], UserSessions.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], UserSessions.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'RevokedAt', nullable: true }),
    __metadata("design:type", Object)
], UserSessions.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'RevokedReason', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], UserSessions.prototype, "revokedReason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.userSessions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], UserSessions.prototype, "user", void 0);
exports.UserSessions = UserSessions = __decorate([
    (0, typeorm_1.Index)('IX_UserSessions_RefreshToken', ['refreshToken'], {}),
    (0, typeorm_1.Index)('IX_UserSessions_UserId', ['userId'], {}),
    (0, typeorm_1.Index)('IX_UserSessions_UserId_IsActive', ['userId', 'isActive'], {}),
    (0, typeorm_1.Index)('PK__UserSess__3214EC0799F58D22', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('UserSessions', { schema: 'dbo' })
], UserSessions);
//# sourceMappingURL=UserSessions.js.map