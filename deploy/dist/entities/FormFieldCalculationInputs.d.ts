import { FormFieldCalculations } from './FormFieldCalculations';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';
export declare class FormFieldCalculationInputs {
    inputId: number;
    calculationId: number;
    inputToken: string;
    columnKey: string;
    labelEn: string;
    labelAr: string;
    placeholderEn: string | null;
    placeholderAr: string | null;
    displayOrder: number;
    isRequired: boolean;
    isReadOnly: boolean;
    isVisible: boolean;
    validationMessageEn: string | null;
    validationMessageAr: string | null;
    isActive: boolean;
    createdAt: Date;
    dataTypeId: number;
    controlTypeId: number;
    calculation: FormFieldCalculations;
    dataType: DataTypes;
    controlType: ControlTypes;
}
