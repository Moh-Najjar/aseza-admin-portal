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
exports.FieldDependencies = void 0;
const typeorm_1 = require("typeorm");
const FormFields_1 = require("./FormFields");
let FieldDependencies = class FieldDependencies {
    dependencyId;
    conditionOperator;
    conditionValue;
    action;
    createdAt;
    fieldId;
    dependsOnFieldId;
    field;
    dependsOnField;
};
exports.FieldDependencies = FieldDependencies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'DependencyId' }),
    __metadata("design:type", Number)
], FieldDependencies.prototype, "dependencyId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ConditionOperator', length: 20 }),
    __metadata("design:type", String)
], FieldDependencies.prototype, "conditionOperator", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'ConditionValue', length: 200 }),
    __metadata("design:type", String)
], FieldDependencies.prototype, "conditionValue", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Action', length: 20, default: () => "'SHOW'" }),
    __metadata("design:type", String)
], FieldDependencies.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], FieldDependencies.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'FieldId' }),
    __metadata("design:type", Number)
], FieldDependencies.prototype, "fieldId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'DependsOnFieldId' }),
    __metadata("design:type", Number)
], FieldDependencies.prototype, "dependsOnFieldId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.fieldDependencies),
    (0, typeorm_1.JoinColumn)([{ name: 'FieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FieldDependencies.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FormFields_1.FormFields, (formFields) => formFields.fieldDependencies2),
    (0, typeorm_1.JoinColumn)([{ name: 'DependsOnFieldId', referencedColumnName: 'fieldId' }]),
    __metadata("design:type", FormFields_1.FormFields)
], FieldDependencies.prototype, "dependsOnField", void 0);
exports.FieldDependencies = FieldDependencies = __decorate([
    (0, typeorm_1.Index)('PK__FieldDep__A0D1A562E6A43FAA', ['dependencyId'], { unique: true }),
    (0, typeorm_1.Entity)('FieldDependencies', { schema: 'dbo' })
], FieldDependencies);
//# sourceMappingURL=FieldDependencies.js.map