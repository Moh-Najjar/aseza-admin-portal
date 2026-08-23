import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExternalGroupRoleMapping } from './ExternalGroupRoleMapping';
import { UserRoles } from './UserRoles';

@Index('PK__Roles__8AFACE1A4D10D48A', ['roleId'], { unique: true })
@Index('UQ__Roles__D0EBA515D9D1925A', ['roleKey'], { unique: true })
@Entity('Roles', { schema: 'dbo' })
export class Roles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'RoleId' })
  roleId: number;

  @Column('nvarchar', { name: 'RoleKey', unique: true, length: 100 })
  roleKey: string;

  @Column('nvarchar', { name: 'RoleName', length: 150 })
  roleName: string;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 500 })
  description: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => ExternalGroupRoleMapping,
    (externalGroupRoleMapping) => externalGroupRoleMapping.role,
  )
  externalGroupRoleMappings: ExternalGroupRoleMapping[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[];
}
