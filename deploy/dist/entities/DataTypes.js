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
exports.DataTypes = void 0;
const typeorm_1 = require("typeorm");
const FormFieldCalculationInputs_1 = require("./FormFieldCalculationInputs");
const FormFieldCalculations_1 = require("./FormFieldCalculations");
const FormFieldColumns_1 = require("./FormFieldColumns");
const FormFields_1 = require("./FormFields");
const KpiDefinitions_1 = require("./KpiDefinitions");
let DataTypes = class DataTypes {
    dataTypeId;
    typeKey;
    typeName;
    description;
    isActive;
    createdAt;
    formFieldCalculationInputs;
    formFieldCalculations;
    formFieldColumns;
    formFields;
    kpiDefinitions;
};
exports.DataTypes = DataTypes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'DataTypeId' }),
    __metadata("design:type", Number)
], DataTypes.prototype, "dataTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'TypeKey', unique: true, length: 50 }),
    __metadata("design:type", String)
], DataTypes.prototype, "typeKey", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'TypeName', length: 100 }),
    __metadata("design:type", String)
], DataTypes.prototype, "typeName", void 0);
__decorate([
    (0, typeorm_1.Column)('nvarchar', { name: 'Description', nullable: true, length: 300 }),
    __metadata("design:type", Object)
], DataTypes.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('bit', { name: 'IsActive', default: () => '(1)' }),
    __metadata("design:type", Boolean)
], DataTypes.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' }),
    __metadata("design:type", Date)
], DataTypes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldCalculationInputs_1.FormFieldCalculationInputs, (formFieldCalculationInputs) => formFieldCalculationInputs.dataType),
    __metadata("design:type", Array)
], DataTypes.prototype, "formFieldCalculationInputs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldCalculations_1.FormFieldCalculations, (formFieldCalculations) => formFieldCalculations.resultDataType),
    __metadata("design:type", Array)
], DataTypes.prototype, "formFieldCalculations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFieldColumns_1.FormFieldColumns, (formFieldColumns) => formFieldColumns.dataType),
    __metadata("design:type", Array)
], DataTypes.prototype, "formFieldColumns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FormFields_1.FormFields, (formFields) => formFields.dataType),
    __metadata("design:type", Array)
], DataTypes.prototype, "formFields", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KpiDefinitions_1.KpiDefinitions, (kpiDefinitions) => kpiDefinitions.dataType),
    __metadata("design:type", Array)
], DataTypes.prototype, "kpiDefinitions", void 0);
exports.DataTypes = DataTypes = __decorate([
    (0, typeorm_1.Index)('PK__DataType__4382081F2203AF0D', ['dataTypeId'], { unique: true }),
    (0, typeorm_1.Index)('UQ__DataType__EDA22245378D31F0', ['typeKey'], { unique: true }),
    (0, typeorm_1.Entity)('DataTypes', { schema: 'dbo' })
], DataTypes);
//# sourceMappingURL=DataTypes.js.map