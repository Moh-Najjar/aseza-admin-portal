"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoratesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const directorates_controller_1 = require("./directorates.controller");
const directorates_service_1 = require("./directorates.service");
const Directorates_1 = require("../../entities/Directorates");
const Forms_1 = require("../../entities/Forms");
const DirectorateFormAccess_1 = require("../../entities/DirectorateFormAccess");
let DirectoratesModule = class DirectoratesModule {
};
exports.DirectoratesModule = DirectoratesModule;
exports.DirectoratesModule = DirectoratesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Directorates_1.Directorates, Forms_1.Forms, DirectorateFormAccess_1.DirectorateFormAccess]),
        ],
        controllers: [directorates_controller_1.DirectoratesController],
        providers: [directorates_service_1.DirectoratesService],
    })
], DirectoratesModule);
//# sourceMappingURL=directorates.module.js.map