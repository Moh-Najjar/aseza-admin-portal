import { FormFieldCalculationInputs } from './FormFieldCalculationInputs';
import { FormFields } from './FormFields';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';
export declare class FormFieldCalculations {
    calculationId: number;
    fieldId: number;
    formulaExpression: string;
    resultColumnKey: string;
    resultLabelEn: string;
    resultLabelAr: string;
    resultPrecision: number;
    buttonLabelEn: string | null;
    buttonLabelAr: string | null;
    helpTextEn: string | null;
    helpTextAr: string | null;
    displayFormulaEn: string | null;
    displayFormulaAr: string | null;
    isActive: boolean;
    createdAt: Date;
    resultDataTypeId: number;
    resultControlTypeId: number;
    formFieldCalculationInputs: FormFieldCalculationInputs[];
    field: FormFields;
    resultDataType: DataTypes;
    resultControlType: ControlTypes;
}
