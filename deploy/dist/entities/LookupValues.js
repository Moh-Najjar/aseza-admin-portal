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
exports.LookupValues = void 0;
const typeorm_1 = require("typeorm");
const FormSubmissionMultiValues_1 = require("./FormSubmissionMultiValues");
const LookupTypes_1 = require("./LookupTypes");
let LookupValues = class LookupValues {
    lookupValueId;
    code;
    nameEn;
    nameAr;
    isActive;
    formSubmissionMultiValues;
    lookupType;
    parent;
    lookupValues;
};
exports.LookupValues = LookupValues;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'LookupValueId' }),
    __metadata("design:type", Number)
], LookupValues.prototype, "lookupValueId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Code', nullable: true, length: 50 }),
    __metadata("design:type", Object)
], LookupValues.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameEn', length: 100 }),
    __metadata("design:type", String)
], LookupValues.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'NameAr', length: 100 }),
    __metadata("design:type", String)
], LookupValues.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', nullable: true, default: () => '(1)' }),
    __metadata("design:type", Object)
], LookupValues.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormSubmissionMultiValues_1.FormSubmissionMultiValues, (formSubmissionMultiValues) => formSubmissionMultiValues.lookupValue),
    __metadata("design:type", Array)
], LookupValues.prototype, "formSubmissionMultiValues", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LookupTypes_1.LookupTypes, (lookupTypes) => lookupTypes.lookupValues),
    (0, typeorm_1.JoinColumn)([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }]),
    __metadata("design:type", LookupTypes_1.LookupTypes)
], LookupValues.prototype, "lookupType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LookupValues, (lookupValues) => lookupValues.lookupValues),
    (0, typeorm_1.JoinColumn)([{ name: 'ParentId', referencedColumnName: 'lookupValueId' }]),
    __metadata("design:type", LookupValues)
], LookupValues.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LookupValues, (lookupValues) => lookupValues.parent),
    __metadata("design:type", Array)
], LookupValues.prototype, "lookupValues", void 0);
exports.LookupValues = LookupValues = __decorate([
    (0, typeorm_1.Index)('PK__LookupVa__BFA1132CD7C2F349', ['lookupValueId'], { unique: true }),
    (0, typeorm_1.Entity)('LookupValues', { schema: 'dbo' })
], LookupValues);
//# sourceMappingURL=LookupValues.js.map