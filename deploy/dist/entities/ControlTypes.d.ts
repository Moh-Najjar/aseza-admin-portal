import { FormFieldCalculationInputs } from './FormFieldCalculationInputs';
import { FormFieldCalculations } from './FormFieldCalculations';
import { FormFieldColumns } from './FormFieldColumns';
import { FormFields } from './FormFields';
export declare class ControlTypes {
    controlTypeId: number;
    controlKey: string;
    controlName: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    formFieldCalculationInputs: FormFieldCalculationInputs[];
    formFieldCalculations: FormFieldCalculations[];
    formFieldColumns: FormFieldColumns[];
    formFields: FormFields[];
}
