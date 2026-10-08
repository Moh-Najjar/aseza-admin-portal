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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const DirectorateFormAccess_1 = require("./DirectorateFormAccess");
const Forms_1 = require("./Forms");
const FormSubmissions_1 = require("./FormSubmissions");
const FormVersions_1 = require("./FormVersions");
const LoginAuditLogs_1 = require("./LoginAuditLogs");
const SubmissionAuditLogs_1 = require("./SubmissionAuditLogs");
const UserRoles_1 = require("./UserRoles");
const Directorates_1 = require("./Directorates");
const UserSessions_1 = require("./UserSessions");
let Users = class Users {
    userId;
    externalObjectId;
    username;
    fullNameEn;
    fullNameAr;
    email;
    isActive;
    lastLoginAt;
    createdAt;
    directorateFormAccesses;
    forms;
    forms2;
    formSubmissions;
    formSubmissions2;
    formSubmissions3;
    formVersions;
    loginAuditLogs;
    submissionAuditLogs;
    userRoles;
    userRoles2;
    directorateId;
    directorate;
    userSessions;
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'UserId' }),
    __metadata("design:type", Number)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ExternalObjectId', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], Users.prototype, "externalObjectId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Username', unique: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FullNameEn', length: 200 }),
    __metadata("design:type", String)
], Users.prototype, "fullNameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FullNameAr', nullable: true, length: 200 }),
    __metadata("design:type", Object)
], Users.prototype, "fullNameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Email', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'LastLoginAt', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DirectorateFormAccess_1.DirectorateFormAccess, (directorateFormAccess) => directorateFormAccess.grantedBy),
    __metadata("design:type", Array)
], Users.prototype, "directorateFormAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Forms_1.Forms, (forms) => forms.createdBy),
    __metadata("design:type", Array)
], Users.prototype, "forms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Forms_1.Forms, (forms) => forms.updatedBy),
    __metadata("design:type", Array)
], Users.prototype, "forms2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.enteredByUser),
    __metadata("design:type", Array)
], Users.prototype, "formSubmissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "formSubmissions2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.approvedByUser),
    __metadata("design:type", Array)
], Users.prototype, "formSubmissions3", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormVersions_1.FormVersions, (formVersions) => formVersions.createdBy),
    __metadata("design:type", Array)
], Users.prototype, "formVersions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LoginAuditLogs_1.LoginAuditLogs, (loginAuditLogs) => loginAuditLogs.user),
    __metadata("design:type", Array)
], Users.prototype, "loginAuditLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SubmissionAuditLogs_1.SubmissionAuditLogs, (submissionAuditLogs) => submissionAuditLogs.actionByUser),
    __metadata("design:type", Array)
], Users.prototype, "submissionAuditLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoles_1.UserRoles, (userRoles) => userRoles.user),
    __metadata("design:type", Array)
], Users.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoles_1.UserRoles, (userRoles) => userRoles.assignedByUser),
    __metadata("design:type", Array)
], Users.prototype, "userRoles2", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DirectorateId', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Directorates_1.Directorates, (directorates) => directorates.users),
    (0, typeorm_1.JoinColumn)([
        { name: 'DirectorateId', referencedColumnName: 'directorateId' },
    ]),
    __metadata("design:type", Directorates_1.Directorates)
], Users.prototype, "directorate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserSessions_1.UserSessions, (userSessions) => userSessions.user),
    __metadata("design:type", Array)
], Users.prototype, "userSessions", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)('PK__Users__1788CC4C69689014', ['userId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__Users__536C85E420A3112F', ['username'], { unique: true }),
    (0, typeorm_1.Entity)('Users', { schema: 'dbo' })
], Users);
//# sourceMappingURL=Users.js.map