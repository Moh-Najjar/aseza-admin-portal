import { FormSubmissions } from './FormSubmissions';
import { KpiDefinitions } from './KpiDefinitions';
import { Frequencies } from './Frequencies';
export declare class KpiSubmissionPeriods {
    kpiSubmissionPeriodId: string;
    submissionId: string;
    directorateId: number;
    kpiId: number;
    frequencyId: number;
    periodStartDate: Date;
    submissionStatus: string;
    createdAt: Date;
    submission: FormSubmissions;
    kpi: KpiDefinitions;
    frequency: Frequencies;
}
