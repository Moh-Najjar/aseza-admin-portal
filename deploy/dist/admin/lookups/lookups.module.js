"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lookups_controller_1 = require("./lookups.controller");
const lookups_service_1 = require("./lookups.service");
const ControlTypes_1 = require("../../entities/ControlTypes");
const DataTypes_1 = require("../../entities/DataTypes");
const LookupTypes_1 = require("../../entities/LookupTypes");
const LookupValues_1 = require("../../entities/LookupValues");
const Frequencies_1 = require("../../entities/Frequencies");
let LookupsModule = class LookupsModule {
};
exports.LookupsModule = LookupsModule;
exports.LookupsModule = LookupsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                ControlTypes_1.ControlTypes,
                DataTypes_1.DataTypes,
                LookupTypes_1.LookupTypes,
                LookupValues_1.LookupValues,
                Frequencies_1.Frequencies,
            ]),
        ],
        controllers: [lookups_controller_1.LookupsController],
        providers: [lookups_service_1.LookupsService],
    })
], LookupsModule);
//# sourceMappingURL=lookups.module.js.map