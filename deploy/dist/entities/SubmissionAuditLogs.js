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
exports.SubmissionAuditLogs = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const Users_1 = require("./Users");
let SubmissionAuditLogs = class SubmissionAuditLogs {
    auditId;
    actionType;
    fieldKey;
    oldValue;
    newValue;
    actionAt;
    comment;
    ipAddress;
    submission;
    actionByUser;
};
exports.SubmissionAuditLogs = SubmissionAuditLogs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'AuditId' }),
    __metadata("design:type", String)
], SubmissionAuditLogs.prototype, "auditId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ActionType', length: 50 }),
    __metadata("design:type", String)
], SubmissionAuditLogs.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FieldKey', nullable: true, length: 100 }),
    __metadata("design:type", Object)
], SubmissionAuditLogs.prototype, "fieldKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'OldValue', nullable: true }),
    __metadata("design:type", Object)
], SubmissionAuditLogs.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NewValue', nullable: true }),
    __metadata("design:type", Object)
], SubmissionAuditLogs.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'ActionAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], SubmissionAuditLogs.prototype, "actionAt", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Comment', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], SubmissionAuditLogs.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'IpAddress', nullable: true, length: 50 }),
    __metadata("design:type", Object)
], SubmissionAuditLogs.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.submissionAuditLogs),
    (0, typeorm_1.JoinColumn)([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }]),
    __metadata("design:type", FormSubmissions_1.FormSubmissions)
], SubmissionAuditLogs.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.submissionAuditLogs),
    (0, typeorm_1.JoinColumn)([{ name: 'ActionByUserId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], SubmissionAuditLogs.prototype, "actionByUser", void 0);
exports.SubmissionAuditLogs = SubmissionAuditLogs = __decorate([
    (0, typeorm_1.Index)('PK__Submissi__A17F23986616F26B', ['auditId'], { unique: true }),
    (0, typeorm_1.Entity)('SubmissionAuditLogs', { schema: 'dbo' })
], SubmissionAuditLogs);
//# sourceMappingURL=SubmissionAuditLogs.js.map