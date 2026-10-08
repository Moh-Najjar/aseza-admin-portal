import { DirectorateFormAccess } from './DirectorateFormAccess';
import { Forms } from './Forms';
import { FormSubmissions } from './FormSubmissions';
import { KpiDefinitions } from './KpiDefinitions';
import { Users } from './Users';
export declare class Directorates {
    directorateId: number;
    directorateKey: string;
    nameEn: string;
    nameAr: string;
    isActive: boolean;
    createdAt: Date;
    directorateFormAccesses: DirectorateFormAccess[];
    forms: Forms[];
    formSubmissions: FormSubmissions[];
    kpiDefinitions: KpiDefinitions[];
    users: Users[];
}
