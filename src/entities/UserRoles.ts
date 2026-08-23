import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Roles } from './Roles';

@Index('PK__UserRole__3D978A35A884A9B1', ['userRoleId'], { unique: true })
@Index('UQ_UserRoles_User_Role', ['userId', 'roleId'], { unique: true })
@Entity('UserRoles', { schema: 'dbo' })
export class UserRoles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'UserRoleId' })
  userRoleId: number;

  @Column('int', { name: 'UserId', unique: true })
  userId: number;

  @Column('int', { name: 'RoleId', unique: true })
  roleId: number;

  @Column('datetime2', {
    name: 'AssignedAt',
    default: () => 'sysutcdatetime()',
  })
  assignedAt: Date;

  @ManyToOne(() => Users, (users) => users.userRoles)
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'userId' }])
  user: Users;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: 'RoleId', referencedColumnName: 'roleId' }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles2)
  @JoinColumn([{ name: 'AssignedByUserId', referencedColumnName: 'userId' }])
  assignedByUser: Users;
}
