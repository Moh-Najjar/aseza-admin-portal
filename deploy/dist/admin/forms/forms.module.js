"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const forms_controller_1 = require("./forms.controller");
const fields_controller_1 = require("./fields.controller");
const forms_service_1 = require("./forms.service");
const fields_service_1 = require("./fields.service");
const Forms_1 = require("../../entities/Forms");
const FormFields_1 = require("../../entities/FormFields");
const FieldOptions_1 = require("../../entities/FieldOptions");
const FieldDependencies_1 = require("../../entities/FieldDependencies");
const FormFieldColumns_1 = require("../../entities/FormFieldColumns");
const FormFieldRows_1 = require("../../entities/FormFieldRows");
const FormFieldCalculations_1 = require("../../entities/FormFieldCalculations");
const FormFieldCalculationInputs_1 = require("../../entities/FormFieldCalculationInputs");
const KpiDefinitions_1 = require("../../entities/KpiDefinitions");
const Frequencies_1 = require("../../entities/Frequencies");
const KpiSubmissionPeriods_1 = require("../../entities/KpiSubmissionPeriods");
let FormsManagementModule = class FormsManagementModule {
};
exports.FormsManagementModule = FormsManagementModule;
exports.FormsManagementModule = FormsManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Forms_1.Forms,
                FormFields_1.FormFields,
                FieldOptions_1.FieldOptions,
                FieldDependencies_1.FieldDependencies,
                FormFieldColumns_1.FormFieldColumns,
                FormFieldRows_1.FormFieldRows,
                FormFieldCalculations_1.FormFieldCalculations,
                FormFieldCalculationInputs_1.FormFieldCalculationInputs,
                KpiDefinitions_1.KpiDefinitions,
                Frequencies_1.Frequencies,
                KpiSubmissionPeriods_1.KpiSubmissionPeriods,
            ]),
        ],
        controllers: [forms_controller_1.FormsController, fields_controller_1.FieldsController],
        providers: [forms_service_1.FormsService, fields_service_1.FieldsService],
    })
], FormsManagementModule);
//# sourceMappingURL=forms.module.js.map