import { FormFields } from '../../../entities/FormFields';
import { FrequencySummary } from '../../../common/frequency/frequency-periods';
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
    isActive: boolean | null;
    frequencyId: number | null;
    frequency: FrequencySummary | null;
    periodStartDate: string | null;
    fieldOptions: FormFields['fieldOptions'];
    fieldDependencies: FormFields['fieldDependencies'];
    formFieldColumns: FormFields['formFieldColumns'];
    formFieldRows: FormFields['formFieldRows'];
    formFieldCalculations: FormFields['formFieldCalculations'];
}
export declare const FIELD_RESPONSE_RELATIONS: {
    readonly kpi: {
        readonly frequency: true;
    };
    readonly fieldOptions: true;
    readonly fieldDependencies: true;
    readonly formFieldColumns: true;
    readonly formFieldRows: true;
    readonly formFieldCalculations: {
        readonly formFieldCalculationInputs: true;
    };
};
export declare function mapFormFieldToResponse(field: FormFields): FormFieldResponse;
