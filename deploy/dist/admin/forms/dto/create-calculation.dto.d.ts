export declare class CreateCalculationInputDto {
    inputToken: string;
    columnKey: string;
    labelEn: string;
    labelAr: string;
    dataTypeId: number;
    controlTypeId: number;
    displayOrder: number;
    placeholderEn?: string;
    placeholderAr?: string;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isVisible?: boolean;
    validationMessageEn?: string;
    validationMessageAr?: string;
}
export declare class CreateCalculationDto {
    formulaExpression: string;
    resultDataTypeId: number;
    resultControlTypeId: number;
    resultColumnKey?: string;
    resultLabelEn?: string;
    resultLabelAr?: string;
    resultPrecision?: number;
    buttonLabelEn?: string;
    buttonLabelAr?: string;
    helpTextEn?: string;
    helpTextAr?: string;
    displayFormulaEn?: string;
    displayFormulaAr?: string;
    inputs: CreateCalculationInputDto[];
}
