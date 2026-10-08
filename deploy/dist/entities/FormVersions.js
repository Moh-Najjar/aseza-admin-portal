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
exports.FormVersions = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissions_1 = require("./FormSubmissions");
const Forms_1 = require("./Forms");
const Users_1 = require("./Users");
let FormVersions = class FormVersions {
    formVersionId;
    formId;
    version;
    schemaSnapshotJson;
    changeNotes;
    createdAt;
    formSubmissions;
    form;
    createdBy;
};
exports.FormVersions = FormVersions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'FormVersionId' }),
    __metadata("design:type", Number)
], FormVersions.prototype, "formVersionId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FormId', unique: true }),
    __metadata("design:type", Number)
], FormVersions.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'Version', unique: true }),
    __metadata("design:type", Number)
], FormVersions.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'SchemaSnapshotJson' }),
    __metadata("design:type", String)
], FormVersions.prototype, "schemaSnapshotJson", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ChangeNotes', nullable: true, length: 1000 }),
    __metadata("design:type", Object)
], FormVersions.prototype, "changeNotes", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FormVersions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissions_1.FormSubmissions, (formSubmissions) => formSubmissions.formVersion),
    __metadata("design:type", Array)
], FormVersions.prototype, "formSubmissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Forms_1.Forms, (forms) => forms.formVersions),
    (0, typeorm_1.JoinColumn)([{ name: 'FormId', referencedColumnName: 'formId' }]),
    __metadata("design:type", Forms_1.Forms)
], FormVersions.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.formVersions),
    (0, typeorm_1.JoinColumn)([{ name: 'CreatedBy', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], FormVersions.prototype, "createdBy", void 0);
exports.FormVersions = FormVersions = __decorate([
    (0, typeorm_1.Index)('PK__FormVers__2ADD4DA7956D2BA9', ['formVersionId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_FormVersions', ['formId', 'version'], { unique: true }),
    (0, typeorm_1.Entity)('FormVersions', { schema: 'dbo' })
], FormVersions);
//# sourceMappingURL=FormVersions.js.map