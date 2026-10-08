import { FormFields } from './FormFields';
export declare class FormFieldRows {
    rowId: number;
    fieldId: number;
    rowKey: string;
    labelEn: string;
    labelAr: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    placeholderEn: string | null;
    placeholderAr: string | null;
    isRequired: boolean | null;
    isReadOnly: boolean | null;
    isVisible: boolean | null;
    defaultValue: string | null;
    helpTextEn: string | null;
    helpTextAr: string | null;
    validationMessageEn: string | null;
    validationMessageAr: string | null;
    field: FormFields;
}
