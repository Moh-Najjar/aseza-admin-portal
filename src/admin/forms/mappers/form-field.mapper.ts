import { FormFields } from '../../../entities/FormFields';
import {
  FrequencySummary,
  hasDiscretePeriods,
  supportsCustomPeriodStart,
  formatDateOnly,
} from '../../../common/frequency/frequency-periods';

/**
 * API response shape for a form field.
 * `isActive` and `frequency` are projected from dbo.KpiDefinitions via the field's KpiId FK —
 * they are NOT columns on dbo.FormFields.
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
  /** FrequencyId from linked KPI — null when the field has no KPI or the KPI has no frequency */
  frequencyId: number | null;
  /** Catalog frequency from linked KPI — null when unassigned */
  frequency: FrequencySummary | null;
  /**
   * Recurring period start (YYYY-MM-DD) from KpiDefinitions.ReferenceDate.
   * Month+day repeat every cycle — e.g. 2026-02-01 = first of February.
   */
  periodStartDate: string | null;
  fieldOptions: FormFields['fieldOptions'];
  fieldDependencies: FormFields['fieldDependencies'];
  formFieldColumns: FormFields['formFieldColumns'];
  formFieldRows: FormFields['formFieldRows'];
  formFieldCalculations: FormFields['formFieldCalculations'];
}

/** Relation graph loaded whenever fields are returned to the client */
export const FIELD_RESPONSE_RELATIONS = {
  kpi: { frequency: true },
  fieldOptions: true,
  fieldDependencies: true,
  formFieldColumns: true,
  formFieldRows: true,
  formFieldCalculations: { formFieldCalculationInputs: true },
} as const;

/**
 * Maps a FormFields entity (with optional kpi + frequency relations) to the API response.
 * Strips nested kpi/frequency entities — exposes isActive, frequencyId, and frequency summary.
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
    frequencyId: field.kpi?.frequencyId ?? null,
    frequency: mapFrequencySummary(field),
    periodStartDate: mapPeriodStartDate(field),
    fieldOptions: field.fieldOptions ?? [],
    fieldDependencies: field.fieldDependencies ?? [],
    formFieldColumns: field.formFieldColumns ?? [],
    formFieldRows: field.formFieldRows ?? [],
    formFieldCalculations: field.formFieldCalculations ?? null,
  };
}

/** Projects the KPI's catalog frequency, or null when the field/KPI has none. */
function mapFrequencySummary(field: FormFields): FrequencySummary | null {
  const frequency = field.kpi?.frequency;
  if (!frequency) {
    return null;
  }

  return {
    frequencyId: frequency.frequencyId,
    code: frequency.code,
    nameEn: frequency.nameEn,
    nameAr: frequency.nameAr,
    description: frequency.description,
    hasDiscretePeriods: hasDiscretePeriods(frequency.code),
    supportsCustomPeriodStart: supportsCustomPeriodStart(frequency.code),
  };
}

/** Projects KpiDefinitions.ReferenceDate as YYYY-MM-DD, or null when unset. */
function mapPeriodStartDate(field: FormFields): string | null {
  const referenceDate = field.kpi?.referenceDate;
  if (!referenceDate) {
    return null;
  }
  return formatDateOnly(referenceDate);
}
