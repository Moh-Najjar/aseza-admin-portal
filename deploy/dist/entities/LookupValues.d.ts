import { FormSubmissionMultiValues } from './FormSubmissionMultiValues';
import { LookupTypes } from './LookupTypes';
export declare class LookupValues {
    lookupValueId: number;
    code: string | null;
    nameEn: string;
    nameAr: string;
    isActive: boolean | null;
    formSubmissionMultiValues: FormSubmissionMultiValues[];
    lookupType: LookupTypes;
    parent: LookupValues;
    lookupValues: LookupValues[];
}
