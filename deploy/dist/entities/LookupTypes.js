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
exports.LookupTypes = void 0;
const typeorm_1 = require("typeorm");
const FormFieldColumns_1 = require("./FormFieldColumns");
const FormFields_1 = require("./FormFields");
const LookupValues_1 = require("./LookupValues");
let LookupTypes = class LookupTypes {
    lookupTypeId;
    code;
    nameEn;
    nameAr;
    isActive;
    formFieldColumns;
    formFields;
    lookupValues;
};
exports.LookupTypes = LookupTypes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'LookupTypeId' }),
    __metadata("design:type", Number)
], LookupTypes.prototype, "lookupTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Code', unique: true, length: 50 }),
    __metadata("design:type", String)
], LookupTypes.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 100 }),
    __metadata("design:type", String)
], LookupTypes.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 100 }),
    __metadata("design:type", String)
], LookupTypes.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', nullable: true, default: () => '(1)' }),
    __metadata("design:type", Object)
], LookupTypes.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldColumns_1.FormFieldColumns, (formFieldColumns) => formFieldColumns.lookupType),
    __metadata("design:type", Array)
], LookupTypes.prototype, "formFieldColumns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFields_1.FormFields, (formFields) => formFields.lookupType),
    __metadata("design:type", Array)
], LookupTypes.prototype, "formFields", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LookupValues_1.LookupValues, (lookupValues) => lookupValues.lookupType),
    __metadata("design:type", Array)
], LookupTypes.prototype, "lookupValues", void 0);
exports.LookupTypes = LookupTypes = __decorate([
    (0, typeorm_1.Index)('PK__LookupTy__15BEA5E1CBF88929', ['lookupTypeId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__LookupTy__A25C5AA750EA36C9', ['code'], { unique: true }),
    (0, typeorm_1.Entity)('LookupTypes', { schema: 'dbo' })
], LookupTypes);
//# sourceMappingURL=LookupTypes.js.map