import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './Roles';

@Index('PK__External__3214EC0735B4077A', ['id'], { unique: true })
@Entity('ExternalGroupRoleMapping', { schema: 'dbo' })
export class ExternalGroupRoleMapping {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'GroupObjectId', length: 100 })
  groupObjectId: string;

  @Column('nvarchar', { name: 'GroupKey', length: 100 })
  groupKey: string;

  @Column('nvarchar', { name: 'GroupNameEn', length: 200 })
  groupNameEn: string;

  @Column('nvarchar', { name: 'GroupNameAr', nullable: true, length: 200 })
  groupNameAr: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysdatetime()' })
  createdAt: Date;

  @ManyToOne(() => Roles, (roles) => roles.externalGroupRoleMappings)
  @JoinColumn([{ name: 'RoleId', referencedColumnName: 'roleId' }])
  role: Roles;
}
