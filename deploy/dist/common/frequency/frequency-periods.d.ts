export interface PeriodAnchor {
    month: number;
    day: number;
}
export interface ExpectedPeriod {
    periodStartDate: string;
    periodEndDate: string;
    labelEn: string;
    labelAr: string;
}
export interface FrequencySummary {
    frequencyId: number;
    code: string;
    nameEn: string;
    nameAr: string;
    description: string | null;
    hasDiscretePeriods: boolean;
    supportsCustomPeriodStart: boolean;
}
export interface GeneratePeriodsOptions {
    year: number;
    month?: number;
    anchor?: PeriodAnchor;
}
export declare function hasDiscretePeriods(code: string): boolean;
export declare function supportsCustomPeriodStart(code: string): boolean;
export declare function formatDateOnly(value: Date | string): string;
export declare function parsePeriodStartDate(value: string): PeriodAnchor | null;
export declare function periodAnchorFromDate(value: Date | string): PeriodAnchor;
export declare function generateExpectedPeriods(code: string, options: GeneratePeriodsOptions): ExpectedPeriod[];
