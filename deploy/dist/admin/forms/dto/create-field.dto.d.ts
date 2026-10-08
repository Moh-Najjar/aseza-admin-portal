export declare class CreateFieldDto {
    fieldKey: string;
    labelEn: string;
    labelAr: string;
    dataTypeId: number;
    controlTypeId: number;
    displayOrder: number;
    lookupTypeId?: number;
    kpiId?: number;
    frequencyId?: number;
    periodStartDate?: string;
    isRequired?: boolean;
    minValue?: number;
    maxValue?: number;
    minLength?: number;
    maxLength?: number;
    regexPattern?: string;
    placeholderEn?: string;
    placeholderAr?: string;
    defaultValue?: string;
    helpTextEn?: string;
    helpTextAr?: string;
    isReadOnly?: boolean;
    isVisible?: boolean;
    validationMessageEn?: string;
    validationMessageAr?: string;
}
