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
exports.DirectorateFormAccess = void 0;
const typeorm_1 = require("typeorm");
const Directorates_1 = require("./Directorates");
const Forms_1 = require("./Forms");
const Users_1 = require("./Users");
let DirectorateFormAccess = class DirectorateFormAccess {
    accessId;
    directorateId;
    formId;
    canView;
    canSubmit;
    canApprove;
    grantedAt;
    directorate;
    form;
    grantedBy;
};
exports.DirectorateFormAccess = DirectorateFormAccess;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'AccessId' }),
    __metadata("design:type", Number)
], DirectorateFormAccess.prototype, "accessId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DirectorateId', unique: true }),
    __metadata("design:type", Number)
], DirectorateFormAccess.prototype, "directorateId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FormId', unique: true }),
    __metadata("design:type", Number)
], DirectorateFormAccess.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'CanView', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], DirectorateFormAccess.prototype, "canView", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'CanSubmit', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], DirectorateFormAccess.prototype, "canSubmit", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'CanApprove', default: () => '(0)' }),
    __metadata("design:type", Boolean)
], DirectorateFormAccess.prototype, "canApprove", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'GrantedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], DirectorateFormAccess.prototype, "grantedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Directorates_1.Directorates, (directorates) => directorates.directorateFormAccesses),
    (0, typeorm_1.JoinColumn)([
        { name: 'DirectorateId', referencedColumnName: 'directorateId' },
    ]),
    __metadata("design:type", Directorates_1.Directorates)
], DirectorateFormAccess.prototype, "directorate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Forms_1.Forms, (forms) => forms.directorateFormAccesses),
    (0, typeorm_1.JoinColumn)([{ name: 'FormId', referencedColumnName: 'formId' }]),
    __metadata("design:type", Forms_1.Forms)
], DirectorateFormAccess.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.directorateFormAccesses),
    (0, typeorm_1.JoinColumn)([{ name: 'GrantedBy', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], DirectorateFormAccess.prototype, "grantedBy", void 0);
exports.DirectorateFormAccess = DirectorateFormAccess = __decorate([
    (0, typeorm_1.Index)('PK__Director__4130D05F2AF71EBC', ['accessId'], { unique: true }),
    (0, typeorm_1.Index)('UQ_DirFormAccess', ['directorateId', 'formId'], { unique: true }),
    (0, typeorm_1.Entity)('DirectorateFormAccess', { schema: 'dbo' })
], DirectorateFormAccess);
//# sourceMappingURL=DirectorateFormAccess.js.map