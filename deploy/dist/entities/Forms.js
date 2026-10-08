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
exports.Forms = void 0;
const typeorm_1 = require("typeorm");
const DirectorateFormAccess_1 = require("./DirectorateFormAccess");
const FormFields_1 = require("./FormFields");
const Directorates_1 = require("./Directorates");
const Users_1 = require("./Users");
const Frequencies_1 = require("./Frequencies");
const FormSubmissions_1 = require("./FormSubmissions");
const FormVersions_1 = require("./FormVersions");
let Forms = class Forms {
    formId;
    formKey;
    nameEn;
    nameAr;
    descriptionEn;
    descriptionAr;
    isActive;
    version;
    effectiveFrom;
    effectiveTo;
    createdAt;
    updatedAt;
    directorateId;
    frequencyId;
    createdByUserId;
    updatedByUserId;
    directorateFormAccesses;
    formFields;
    directorate;
    createdBy;
    updatedBy;
    frequency;
    formSubmissions;
    formVersions;
};
exports.Forms = Forms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'FormId' }),
    __metadata("design:type", Number)
], Forms.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'FormKey', unique: true, length: 100 }),
    __metadata("design:type", String)
], Forms.prototype, "formKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 200 }),
    __metadata("design:type", String)
], Forms.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 200 }),
    __metadata("design:type", String)
], Forms.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DescriptionEn', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], Forms.prototype, "descriptionEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'DescriptionAr', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], Forms.prototype, "descriptionAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], Forms.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'Version', default: () => '(1)' }),
    __metadata("design:type", Number)
], Forms.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'EffectiveFrom', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'EffectiveTo', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], Forms.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'UpdatedAt', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DirectorateId', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FrequencyId', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "frequencyId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'CreatedBy', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'UpdatedBy', nullable: true }),
    __metadata("design:type", Object)
], Forms.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DirectorateFormAccess_1.DirectorateFormAccess, (directorateFormAccess) => directorateFormAccess.form),
    __metadata("design:type", Array)
], Forms.prototype, "directorateFormAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFields_1.FormFields, (formFields) => formFields.form),
    __metadata("design:type", Array)
], Forms.prototype, "formFields", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Directorates_1.Directorates, (directorates) => directorates.forms),
    (0, typeorm_1.JoinColumn)([
        { name: 'DirectorateId', referencedColumnName: 'directorateId' },
    ]),
    __metadata("design:type", Directorates_1.Directorates)
], Forms.prototype, "directorate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.forms),
    (0, typeorm_1.JoinColumn)([{ name: 'CreatedBy', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], Forms.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.forms2),
    (0, typeorm_1.JoinColumn)([{ name: 'UpdatedBy', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], Forms.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Frequencies_1.Frequencies, (frequencies) => frequencies.forms),
    (0, typeorm_1.JoinColumn)([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }]),
    __metadata("design:type", Frequencies_1.Frequencies)
], Forms.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.form),
    __metadata("design:type", Array)
], Forms.prototype, "formSubmissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormVersions_1.FormVersions, (formVersions) => formVersions.form),
    __metadata("design:type", Array)
], Forms.prototype, "formVersions", void 0);
exports.Forms = Forms = __decorate([
    (0, typeorm_1.Index)('PK__Forms__FB05B7DDA73446FE', ['formId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__Forms__37A2B3BD5C3FC4B8', ['formKey'], { unique: true }),
    (0, typeorm_1.Entity)('Forms', { schema: 'dbo' })
], Forms);
//# sourceMappingURL=Forms.js.map