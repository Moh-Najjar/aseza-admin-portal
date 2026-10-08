import { FormSubmissions } from './FormSubmissions';
import { FormFields } from './FormFields';
export declare class FormSubmissionValues {
    submissionValueId: string;
    submissionId: string;
    fieldId: number;
    fieldKey: string;
    valueString: string | null;
    valueNumber: string | null;
    valueDecimal: number | null;
    valueDate: Date | null;
    valueBoolean: boolean | null;
    valueJson: string | null;
    createdAt: Date;
    submission: FormSubmissions;
    field: FormFields;
}
