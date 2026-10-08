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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsController = void 0;
const common_1 = require("@nestjs/common");
const fields_service_1 = require("./fields.service");
const create_field_dto_1 = require("./dto/create-field.dto");
const update_field_dto_1 = require("./dto/update-field.dto");
const create_option_dto_1 = require("./dto/create-option.dto");
const create_dependency_dto_1 = require("./dto/create-dependency.dto");
const create_column_dto_1 = require("./dto/create-column.dto");
const create_row_dto_1 = require("./dto/create-row.dto");
const update_column_dto_1 = require("./dto/update-column.dto");
const update_row_dto_1 = require("./dto/update-row.dto");
const assign_field_frequency_dto_1 = require("./dto/assign-field-frequency.dto");
const create_calculation_dto_1 = require("./dto/create-calculation.dto");
const frequency_periods_query_dto_1 = require("../../common/dto/frequency-periods-query.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let FieldsController = class FieldsController {
    fieldsService;
    constructor(fieldsService) {
        this.fieldsService = fieldsService;
    }
    getFields(formId) {
        return this.fieldsService.getFields(formId);
    }
    addField(formId, dto) {
        return this.fieldsService.addField(formId, dto);
    }
    updateField(formId, fieldId, dto) {
        return this.fieldsService.updateField(formId, fieldId, dto);
    }
    removeField(formId, fieldId) {
        return this.fieldsService.removeField(formId, fieldId);
    }
    getFieldFrequency(formId, fieldId, query) {
        return this.fieldsService.getFieldFrequency(formId, fieldId, query);
    }
    assignFieldFrequency(formId, fieldId, dto, query) {
        return this.fieldsService.assignFieldFrequency(formId, fieldId, dto, query);
    }
    addOption(formId, fieldId, dto) {
        return this.fieldsService.addOption(formId, fieldId, dto);
    }
    removeOption(formId, fieldId, optionId) {
        return this.fieldsService.removeOption(formId, fieldId, optionId);
    }
    addDependency(formId, fieldId, dto) {
        return this.fieldsService.addDependency(formId, fieldId, dto);
    }
    removeDependency(formId, fieldId, dependencyId) {
        return this.fieldsService.removeDependency(formId, fieldId, dependencyId);
    }
    addColumn(formId, fieldId, dto) {
        return this.fieldsService.addColumn(formId, fieldId, dto);
    }
    updateColumn(formId, fieldId, columnId, dto) {
        return this.fieldsService.updateColumn(formId, fieldId, columnId, dto);
    }
    removeColumn(formId, fieldId, columnId) {
        return this.fieldsService.removeColumn(formId, fieldId, columnId);
    }
    addRow(formId, fieldId, dto) {
        return this.fieldsService.addRow(formId, fieldId, dto);
    }
    updateRow(formId, fieldId, rowId, dto) {
        return this.fieldsService.updateRow(formId, fieldId, rowId, dto);
    }
    removeRow(formId, fieldId, rowId) {
        return this.fieldsService.removeRow(formId, fieldId, rowId);
    }
    setCalculation(formId, fieldId, dto) {
        return this.fieldsService.setCalculation(formId, fieldId, dto);
    }
    removeCalculation(formId, fieldId) {
        return this.fieldsService.removeCalculation(formId, fieldId);
    }
    addCalculationInput(formId, fieldId, dto) {
        return this.fieldsService.addCalculationInput(formId, fieldId, dto);
    }
    removeCalculationInput(formId, fieldId, inputId) {
        return this.fieldsService.removeCalculationInput(formId, fieldId, inputId);
    }
};
exports.FieldsController = FieldsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "getFields", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_field_dto_1.CreateFieldDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addField", null);
__decorate([
    (0, common_1.Patch)(':fieldId'),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_field_dto_1.UpdateFieldDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "updateField", null);
__decorate([
    (0, common_1.Delete)(':fieldId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeField", null);
__decorate([
    (0, common_1.Get)(':fieldId/frequency'),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, frequency_periods_query_dto_1.FrequencyPeriodsQueryDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "getFieldFrequency", null);
__decorate([
    (0, common_1.Put)(':fieldId/frequency'),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, assign_field_frequency_dto_1.AssignFieldFrequencyDto,
        frequency_periods_query_dto_1.FrequencyPeriodsQueryDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "assignFieldFrequency", null);
__decorate([
    (0, common_1.Post)(':fieldId/options'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_option_dto_1.CreateOptionDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addOption", null);
__decorate([
    (0, common_1.Delete)(':fieldId/options/:optionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('optionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeOption", null);
__decorate([
    (0, common_1.Post)(':fieldId/dependencies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_dependency_dto_1.CreateDependencyDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addDependency", null);
__decorate([
    (0, common_1.Delete)(':fieldId/dependencies/:dependencyId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('dependencyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeDependency", null);
__decorate([
    (0, common_1.Post)(':fieldId/columns'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addColumn", null);
__decorate([
    (0, common_1.Patch)(':fieldId/columns/:columnId'),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('columnId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, update_column_dto_1.UpdateColumnDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "updateColumn", null);
__decorate([
    (0, common_1.Delete)(':fieldId/columns/:columnId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('columnId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeColumn", null);
__decorate([
    (0, common_1.Post)(':fieldId/rows'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_row_dto_1.CreateRowDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addRow", null);
__decorate([
    (0, common_1.Patch)(':fieldId/rows/:rowId'),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('rowId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, update_row_dto_1.UpdateRowDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "updateRow", null);
__decorate([
    (0, common_1.Delete)(':fieldId/rows/:rowId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('rowId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeRow", null);
__decorate([
    (0, common_1.Post)(':fieldId/calculation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_calculation_dto_1.CreateCalculationDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "setCalculation", null);
__decorate([
    (0, common_1.Delete)(':fieldId/calculation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeCalculation", null);
__decorate([
    (0, common_1.Post)(':fieldId/calculation/inputs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_calculation_dto_1.CreateCalculationInputDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "addCalculationInput", null);
__decorate([
    (0, common_1.Delete)(':fieldId/calculation/inputs/:inputId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('formId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('inputId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "removeCalculationInput", null);
exports.FieldsController = FieldsController = __decorate([
    (0, common_1.Controller)('admin/forms/:formId/fields'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [fields_service_1.FieldsService])
], FieldsController);
//# sourceMappingURL=fields.controller.js.map