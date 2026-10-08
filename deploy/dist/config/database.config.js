"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDatabaseConfig = buildDatabaseConfig;
const ControlTypes_1 = require("../entities/ControlTypes");
const DataTypes_1 = require("../entities/DataTypes");
const DirectorateFormAccess_1 = require("../entities/DirectorateFormAccess");
const Directorates_1 = require("../entities/Directorates");
const ExternalGroupRoleMapping_1 = require("../entities/ExternalGroupRoleMapping");
const FieldDependencies_1 = require("../entities/FieldDependencies");
const FieldOptions_1 = require("../entities/FieldOptions");
const FormFieldCalculationInputs_1 = require("../entities/FormFieldCalculationInputs");
const FormFieldCalculations_1 = require("../entities/FormFieldCalculations");
const FormFieldColumns_1 = require("../entities/FormFieldColumns");
const FormFieldRows_1 = require("../entities/FormFieldRows");
const FormFields_1 = require("../entities/FormFields");
const Forms_1 = require("../entities/Forms");
const FormSubmissionMultiValues_1 = require("../entities/FormSubmissionMultiValues");
const FormSubmissions_1 = require("../entities/FormSubmissions");
const FormSubmissionTableValues_1 = require("../entities/FormSubmissionTableValues");
const FormSubmissionValues_1 = require("../entities/FormSubmissionValues");
const FormVersions_1 = require("../entities/FormVersions");
const Frequencies_1 = require("../entities/Frequencies");
const KpiDefinitions_1 = require("../entities/KpiDefinitions");
const KpiSubmissionPeriods_1 = require("../entities/KpiSubmissionPeriods");
const LoginAuditLogs_1 = require("../entities/LoginAuditLogs");
const LookupTypes_1 = require("../entities/LookupTypes");
const LookupValues_1 = require("../entities/LookupValues");
const Roles_1 = require("../entities/Roles");
const SubmissionAuditLogs_1 = require("../entities/SubmissionAuditLogs");
const UserRoles_1 = require("../entities/UserRoles");
const Users_1 = require("../entities/Users");
const UserSessions_1 = require("../entities/UserSessions");
const ALL_ENTITIES = [
    ControlTypes_1.ControlTypes,
    DataTypes_1.DataTypes,
    DirectorateFormAccess_1.DirectorateFormAccess,
    Directorates_1.Directorates,
    ExternalGroupRoleMapping_1.ExternalGroupRoleMapping,
    FieldDependencies_1.FieldDependencies,
    FieldOptions_1.FieldOptions,
    FormFieldCalculationInputs_1.FormFieldCalculationInputs,
    FormFieldCalculations_1.FormFieldCalculations,
    FormFieldColumns_1.FormFieldColumns,
    FormFieldRows_1.FormFieldRows,
    FormFields_1.FormFields,
    Forms_1.Forms,
    FormSubmissionMultiValues_1.FormSubmissionMultiValues,
    FormSubmissions_1.FormSubmissions,
    FormSubmissionTableValues_1.FormSubmissionTableValues,
    FormSubmissionValues_1.FormSubmissionValues,
    FormVersions_1.FormVersions,
    Frequencies_1.Frequencies,
    KpiDefinitions_1.KpiDefinitions,
    KpiSubmissionPeriods_1.KpiSubmissionPeriods,
    LoginAuditLogs_1.LoginAuditLogs,
    LookupTypes_1.LookupTypes,
    LookupValues_1.LookupValues,
    Roles_1.Roles,
    SubmissionAuditLogs_1.SubmissionAuditLogs,
    UserRoles_1.UserRoles,
    Users_1.Users,
    UserSessions_1.UserSessions,
];
function buildDatabaseConfig() {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const database = process.env.DB_NAME;
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    if (!host || !port || !database || !username || !password) {
        throw new Error('Missing required database environment variables: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
    }
    return {
        type: 'mssql',
        host,
        port: parseInt(port, 10),
        database,
        username,
        password,
        entities: ALL_ENTITIES,
        synchronize: false,
        logging: process.env.NODE_ENV === 'development',
        options: {
            encrypt: true,
            trustServerCertificate: false,
        },
    };
}
//# sourceMappingURL=database.config.js.map