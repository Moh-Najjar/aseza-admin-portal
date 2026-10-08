import { FormFieldColumns } from './FormFieldColumns';
import { FormFields } from './FormFields';
import { LookupValues } from './LookupValues';
export declare class LookupTypes {
    lookupTypeId: number;
    code: string;
    nameEn: string;
    nameAr: string;
    isActive: boolean | null;
    formFieldColumns: FormFieldColumns[];
    formFields: FormFields[];
    lookupValues: LookupValues[];
}
