import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ControlTypes } from '../entities/ControlTypes';
import { DataTypes } from '../entities/DataTypes';
import { DirectorateFormAccess } from '../entities/DirectorateFormAccess';
import { Directorates } from '../entities/Directorates';
import { ExternalGroupRoleMapping } from '../entities/ExternalGroupRoleMapping';
import { FieldDependencies } from '../entities/FieldDependencies';
import { FieldOptions } from '../entities/FieldOptions';
import { FormFieldCalculationInputs } from '../entities/FormFieldCalculationInputs';
import { FormFieldCalculations } from '../entities/FormFieldCalculations';
import { FormFieldColumns } from '../entities/FormFieldColumns';
import { FormFieldRows } from '../entities/FormFieldRows';
import { FormFields } from '../entities/FormFields';
import { Forms } from '../entities/Forms';
import { FormSubmissionMultiValues } from '../entities/FormSubmissionMultiValues';
import { FormSubmissions } from '../entities/FormSubmissions';
import { FormSubmissionTableValues } from '../entities/FormSubmissionTableValues';
import { FormSubmissionValues } from '../entities/FormSubmissionValues';
import { FormVersions } from '../entities/FormVersions';
import { Frequencies } from '../entities/Frequencies';
import { KpiDefinitions } from '../entities/KpiDefinitions';
import { KpiSubmissionPeriods } from '../entities/KpiSubmissionPeriods';
import { LoginAuditLogs } from '../entities/LoginAuditLogs';
import { LookupTypes } from '../entities/LookupTypes';
import { LookupValues } from '../entities/LookupValues';
import { Roles } from '../entities/Roles';
import { SubmissionAuditLogs } from '../entities/SubmissionAuditLogs';
import { UserRoles } from '../entities/UserRoles';
import { Users } from '../entities/Users';
import { UserSessions } from '../entities/UserSessions';

/** All entities discovered from the live DB via typeorm-model-generator. */
const ALL_ENTITIES = [
  ControlTypes,
  DataTypes,
  DirectorateFormAccess,
  Directorates,
  ExternalGroupRoleMapping,
  FieldDependencies,
  FieldOptions,
  FormFieldCalculationInputs,
  FormFieldCalculations,
  FormFieldColumns,
  FormFieldRows,
  FormFields,
  Forms,
  FormSubmissionMultiValues,
  FormSubmissions,
  FormSubmissionTableValues,
  FormSubmissionValues,
  FormVersions,
  Frequencies,
  KpiDefinitions,
  KpiSubmissionPeriods,
  LoginAuditLogs,
  LookupTypes,
  LookupValues,
  Roles,
  SubmissionAuditLogs,
  UserRoles,
  Users,
  UserSessions,
];

/**
 * Builds TypeORM connection options from environment variables.
 * Validates that all required variables are present at startup.
 */
export function buildDatabaseConfig(): TypeOrmModuleOptions {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;
  const username = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (!host || !port || !database || !username || !password) {
    throw new Error(
      'Missing required database environment variables: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD',
    );
  }

  return {
    type: 'mssql',
    host,
    port: parseInt(port, 10),
    database,
    username,
    password,
    entities: ALL_ENTITIES,
    // Never auto-sync — schema already exists in Azure SQL
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  };
}
