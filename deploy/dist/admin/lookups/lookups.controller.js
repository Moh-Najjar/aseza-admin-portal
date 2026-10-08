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
exports.LookupsController = void 0;
const common_1 = require("@nestjs/common");
const lookups_service_1 = require("./lookups.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const frequency_periods_query_dto_1 = require("../../common/dto/frequency-periods-query.dto");
let LookupsController = class LookupsController {
    lookupsService;
    constructor(lookupsService) {
        this.lookupsService = lookupsService;
    }
    getControlTypes() {
        return this.lookupsService.findControlTypes();
    }
    getDataTypes() {
        return this.lookupsService.findDataTypes();
    }
    getLookupTypes() {
        return this.lookupsService.findLookupTypes();
    }
    getLookupValues(lookupTypeId) {
        return this.lookupsService.findLookupValues(lookupTypeId);
    }
    getFrequencies() {
        return this.lookupsService.findFrequencies();
    }
    getFrequencyPeriods(frequencyId, query) {
        return this.lookupsService.findFrequencyPeriods(frequencyId, query);
    }
};
exports.LookupsController = LookupsController;
__decorate([
    (0, common_1.Get)('control-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getControlTypes", null);
__decorate([
    (0, common_1.Get)('data-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getDataTypes", null);
__decorate([
    (0, common_1.Get)('lookup-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getLookupTypes", null);
__decorate([
    (0, common_1.Get)('lookup-types/:lookupTypeId/values'),
    __param(0, (0, common_1.Param)('lookupTypeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getLookupValues", null);
__decorate([
    (0, common_1.Get)('frequencies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getFrequencies", null);
__decorate([
    (0, common_1.Get)('frequencies/:frequencyId/periods'),
    __param(0, (0, common_1.Param)('frequencyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, frequency_periods_query_dto_1.FrequencyPeriodsQueryDto]),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getFrequencyPeriods", null);
exports.LookupsController = LookupsController = __decorate([
    (0, common_1.Controller)('admin/lookups'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [lookups_service_1.LookupsService])
], LookupsController);
//# sourceMappingURL=lookups.controller.js.map