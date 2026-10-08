import { Roles } from './Roles';
export declare class ExternalGroupRoleMapping {
    id: number;
    groupObjectId: string;
    groupKey: string;
    groupNameEn: string;
    groupNameAr: string | null;
    isActive: boolean;
    createdAt: Date;
    role: Roles;
}
