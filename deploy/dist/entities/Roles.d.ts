import { ExternalGroupRoleMapping } from './ExternalGroupRoleMapping';
import { UserRoles } from './UserRoles';
export declare class Roles {
    roleId: number;
    roleKey: string;
    roleName: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    externalGroupRoleMappings: ExternalGroupRoleMapping[];
    userRoles: UserRoles[];
}
