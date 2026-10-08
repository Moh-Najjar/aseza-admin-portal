import { Users } from './Users';
import { Roles } from './Roles';
export declare class UserRoles {
    userRoleId: number;
    userId: number;
    roleId: number;
    assignedAt: Date;
    user: Users;
    role: Roles;
    assignedByUser: Users;
}
