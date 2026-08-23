import { FormFields } from '../../../entities/FormFields';

/**
 * API response shape for a form field.
 * `isActive` is projected from dbo.KpiDefinitions.IsActive via the field's KpiId FK —
 * it is NOT a column on dbo.FormFields.
 */
export interface FormFieldResponse {
  fieldId: number;
  formId: number;
  fieldKey: string;
  labelEn: string;
  labelAr: string;
  isRequired: boolean;
  minValue: number | null;
  maxValue: number | null;
  minLength: number | null;
  maxLength: number | null;
  regexPattern: string | null;
  placeholderEn: string | null;
  placeholderAr: string | null;
  defaultValue: string | null;
  displayOrder: number;
  helpTextEn: string | null;
  helpTextAr: string | null;
  isReadOnly: boolean;
  isVisible: boolean;
  validationMessageEn: string | null;
  validationMessageAr: string | null;
  createdAt: Date;
  dataTypeId: number;
  controlTypeId: number;
  lookupTypeId: number | null;
  kpiId: number | null;
  /** Active flag from linked KPI — null when the field has no KpiId */
  isActive: boolean | null;
  fieldOptions: FormFields['fieldOptions'];
  fieldDependencies: FormFields['fieldDependencies'];
  formFieldColumns: FormFields['formFieldColumns'];
  formFieldRows: FormFields['formFieldRows'];
  formFieldCalculations: FormFields['formFieldCalculations'];
}

/** Relation graph loaded whenever fields are returned to the client */
export const FIELD_RESPONSE_RELATIONS = {
  kpi: true,
  fieldOptions: true,
  fieldDependencies: true,
  formFieldColumns: true,
  formFieldRows: true,
  formFieldCalculations: { formFieldCalculationInputs: true },
} as const;

/**
 * Maps a FormFields entity (with optional kpi relation) to the API response.
 * Strips the nested kpi object — exposes only kpi.isActive as a top-level flag.
 */
export function mapFormFieldToResponse(field: FormFields): FormFieldResponse {
  return {
    fieldId: field.fieldId,
    formId: field.formId,
    fieldKey: field.fieldKey,
    labelEn: field.labelEn,
    labelAr: field.labelAr,
    isRequired: field.isRequired,
    minValue: field.minValue,
    maxValue: field.maxValue,
    minLength: field.minLength,
    maxLength: field.maxLength,
    regexPattern: field.regexPattern,
    placeholderEn: field.placeholderEn,
    placeholderAr: field.placeholderAr,
    defaultValue: field.defaultValue,
    displayOrder: field.displayOrder,
    helpTextEn: field.helpTextEn,
    helpTextAr: field.helpTextAr,
    isReadOnly: field.isReadOnly,
    isVisible: field.isVisible,
    validationMessageEn: field.validationMessageEn,
    validationMessageAr: field.validationMessageAr,
    createdAt: field.createdAt,
    dataTypeId: field.dataTypeId,
    controlTypeId: field.controlTypeId,
    lookupTypeId: field.lookupTypeId,
    kpiId: field.kpiId,
    isActive: field.kpi?.isActive ?? null,
    fieldOptions: field.fieldOptions ?? [],
    fieldDependencies: field.fieldDependencies ?? [],
    formFieldColumns: field.formFieldColumns ?? [],
    formFieldRows: field.formFieldRows ?? [],
    formFieldCalculations: field.formFieldCalculations ?? null,
  };
}
