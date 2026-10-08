import { FormFields } from './FormFields';
export declare class FieldDependencies {
    dependencyId: number;
    conditionOperator: string;
    conditionValue: string;
    action: string;
    createdAt: Date;
    fieldId: number;
    dependsOnFieldId: number;
    field: FormFields;
    dependsOnField: FormFields;
}
