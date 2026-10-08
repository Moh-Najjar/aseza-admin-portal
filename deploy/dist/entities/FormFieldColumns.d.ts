import { FormFields } from './FormFields';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';
import { LookupTypes } from './LookupTypes';
export declare class FormFieldColumns {
    columnId: number;
    columnKey: string;
    labelEn: string;
    labelAr: string;
    displayOrder: number;
    isRequired: boolean | null;
    fieldId: number;
    dataTypeId: number;
    controlTypeId: number;
    lookupTypeId: number | null;
    field: FormFields;
    dataType: DataTypes;
    controlType: ControlTypes;
    lookupType: LookupTypes;
}
