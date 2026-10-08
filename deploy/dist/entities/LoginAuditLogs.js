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
exports.LoginAuditLogs = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let LoginAuditLogs = class LoginAuditLogs {
    id;
    userId;
    username;
    email;
    ipAddress;
    userAgent;
    isSuccessful;
    failureReason;
    attemptedAt;
    user;
};
exports.LoginAuditLogs = LoginAuditLogs;
__decorate([
    (0, typeorm_1.Column)('uniqueidentifier', { primary: true, name: 'Id' }),
    __metadata("design:type", String)
], LoginAuditLogs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'UserId', nullable: true }),
    __metadata("design:type", Object)
], LoginAuditLogs.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Username', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], LoginAuditLogs.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Email', nullable: true, length: 255 }),
    __metadata("design:type", Object)
], LoginAuditLogs.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'IpAddress', length: 50 }),
    __metadata("design:type", String)
], LoginAuditLogs.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'UserAgent', length: 500 }),
    __metadata("design:type", String)
], LoginAuditLogs.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsSuccessful' }),
    __metadata("design:type", Boolean)
], LoginAuditLogs.prototype, "isSuccessful", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FailureReason', nullable: true, length: 500 }),
    __metadata("design:type", Object)
], LoginAuditLogs.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', {
        name: 'AttemptedAt',
        default: () => 'sysutcdatetime()',
    }),
    __metadata("design:type", Date)
], LoginAuditLogs.prototype, "attemptedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.loginAuditLogs, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], LoginAuditLogs.prototype, "user", void 0);
exports.LoginAuditLogs = LoginAuditLogs = __decorate([
    (0, typeorm_1.Index)('IX_LoginAuditLogs_AttemptedAt', ['attemptedAt'], {}),
    (0, typeorm_1.Index)('IX_LoginAuditLogs_IpAddress_AttemptedAt', ['ipAddress', 'attemptedAt'], {}),
    (0, typeorm_1.Index)('IX_LoginAuditLogs_UserId', ['userId'], {}),
    (0, typeorm_1.Index)('PK__LoginAud__3214EC076EFD8011', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('LoginAuditLogs', { schema: 'dbo' })
], LoginAuditLogs);
//# sourceMappingURL=LoginAuditLogs.js.map