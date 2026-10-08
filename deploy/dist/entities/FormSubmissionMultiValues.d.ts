import { FormSubmissions } from './FormSubmissions';
import { FormFields } from './FormFields';
import { LookupValues } from './LookupValues';
export declare class FormSubmissionMultiValues {
    id: string;
    createdAt: Date;
    submission: FormSubmissions;
    field: FormFields;
    lookupValue: LookupValues;
}
