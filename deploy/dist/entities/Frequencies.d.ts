import { Forms } from './Forms';
import { KpiDefinitions } from './KpiDefinitions';
import { KpiSubmissionPeriods } from './KpiSubmissionPeriods';
export declare class Frequencies {
    frequencyId: number;
    code: string;
    nameEn: string;
    nameAr: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    forms: Forms[];
    kpiDefinitions: KpiDefinitions[];
    kpiSubmissionPeriods: KpiSubmissionPeriods[];
}
