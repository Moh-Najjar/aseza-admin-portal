import { FormFields } from './FormFields';
import { FormSubmissions } from './FormSubmissions';
import { Directorates } from './Directorates';
import { DataTypes } from './DataTypes';
import { Frequencies } from './Frequencies';
import { KpiSubmissionPeriods } from './KpiSubmissionPeriods';
export declare class KpiDefinitions {
    kpiId: number;
    kpiCode: string;
    nameEn: string;
    nameAr: string;
    targetValue: number | null;
    unitEn: string | null;
    unitAr: string | null;
    themeEn: string | null;
    isActive: boolean;
    createdAt: Date;
    referenceDate: Date | null;
    directorateId: number;
    dataTypeId: number;
    frequencyId: number | null;
    formFields: FormFields[];
    formSubmissions: FormSubmissions[];
    directorate: Directorates;
    dataType: DataTypes;
    frequency: Frequencies | null;
    kpiSubmissionPeriods: KpiSubmissionPeriods[];
}
