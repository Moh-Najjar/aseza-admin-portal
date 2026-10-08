import { FormSubmissions } from './FormSubmissions';
import { FormFields } from './FormFields';
export declare class FormSubmissionTableValues {
    id: string;
    rowIndex: number;
    columnKey: string;
    valueString: string | null;
    valueNumber: number | null;
    valueDate: Date | null;
    createdAt: Date;
    submission: FormSubmissions;
    field: FormFields;
}
