import { FormFieldCalculationInputs } from './FormFieldCalculationInputs';
import { FormFieldCalculations } from './FormFieldCalculations';
import { FormFieldColumns } from './FormFieldColumns';
import { FormFields } from './FormFields';
import { KpiDefinitions } from './KpiDefinitions';
export declare class DataTypes {
    dataTypeId: number;
    typeKey: string;
    typeName: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    formFieldCalculationInputs: FormFieldCalculationInputs[];
    formFieldCalculations: FormFieldCalculations[];
    formFieldColumns: FormFieldColumns[];
    formFields: FormFields[];
    kpiDefinitions: KpiDefinitions[];
}
