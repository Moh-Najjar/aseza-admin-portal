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
exports.Directorates = void 0;
const typeorm_1 = require("typeorm");
const DirectorateFormAccess_1 = require("./DirectorateFormAccess");
const Forms_1 = require("./Forms");
const FormSubmissions_1 = require("./FormSubmissions");
const KpiDefinitions_1 = require("./KpiDefinitions");
const Users_1 = require("./Users");
let Directorates = class Directorates {
    directorateId;
    directorateKey;
    nameEn;
    nameAr;
    isActive;
    createdAt;
    directorateFormAccesses;
    forms;
    formSubmissions;
    kpiDefinitions;
    users;
};
exports.Directorates = Directorates;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'DirectorateId' }),
    __metadata("design:type", Number)
], Directorates.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DirectorateKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], Directorates.prototype, "directorateKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 200 }),
    __metadata("design:type", String)
], Directorates.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 200 }),
    __metadata("design:type", String)
], Directorates.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], Directorates.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], Directorates.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DirectorateFormAccess_1.DirectorateFormAccess, (directorateFormAccess) => directorateFormAccess.directorate),
    __metadata("design:type", Array)
], Directorates.prototype, "directorateFormAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Forms_1.Forms, (forms) => forms.directorate),
    __metadata("design:type", Array)
], Directorates.prototype, "forms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.directorate),
    __metadata("design:type", Array)
], Directorates.prototype, "formSubmissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.directorate),
    __metadata("design:type", Array)
], Directorates.prototype, "kpiDefinitions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_1.Users, (users) => users.directorate),
    __metadata("design:type", Array)
], Directorates.prototype, "users", void 0);
exports.Directorates = Directorates = __decorate([
    (0, typeorm_1.Index)('PK__Director__4E9D6F427427F419', ['directorateId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__Director__9877E62CCB658F4C', ['directorateKey'], { unique: true }),
    (0, typeorm_1.Entity)('Directorates', { schema: 'dbo' })
], Directorates);
//# sourceMappingURL=Directorates.js.map