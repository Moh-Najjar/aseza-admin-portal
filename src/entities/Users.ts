import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DirectorateFormAccess } from './DirectorateFormAccess';
import { Forms } from './Forms';
import { FormSubmissions } from './FormSubmissions';
import { FormVersions } from './FormVersions';
import { LoginAuditLogs } from './LoginAuditLogs';
import { SubmissionAuditLogs } from './SubmissionAuditLogs';
import { UserRoles } from './UserRoles';
import { Directorates } from './Directorates';
import { UserSessions } from './UserSessions';

@Index('PK__Users__1788CC4C69689014', ['userId'], { unique: true })
@Index('UQ__Users__536C85E420A3112F', ['username'], { unique: true })
@Entity('Users', { schema: 'dbo' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'UserId' })
  userId: number;

  @Column('nvarchar', { name: 'ExternalObjectId', nullable: true, length: 200 })
  externalObjectId: string | null;

  @Column('nvarchar', { name: 'Username', unique: true, length: 100 })
  username: string;

  @Column('nvarchar', { name: 'FullNameEn', length: 200 })
  fullNameEn: string;

  @Column('nvarchar', { name: 'FullNameAr', nullable: true, length: 200 })
  fullNameAr: string | null;

  @Column('nvarchar', { name: 'Email', length: 255 })
  email: string;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'LastLoginAt', nullable: true })
  lastLoginAt: Date | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => DirectorateFormAccess,
    (directorateFormAccess) => directorateFormAccess.grantedBy,
  )
  directorateFormAccesses: DirectorateFormAccess[];

  @OneToMany(() => Forms, (forms) => forms.createdBy)
  forms: Forms[];

  @OneToMany(() => Forms, (forms) => forms.updatedBy)
  forms2: Forms[];

  @OneToMany(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.enteredByUser,
  )
  formSubmissions: FormSubmissions[];

  @OneToMany(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.updatedByUser,
  )
  formSubmissions2: FormSubmissions[];

  @OneToMany(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.approvedByUser,
  )
  formSubmissions3: FormSubmissions[];

  @OneToMany(() => FormVersions, (formVersions) => formVersions.createdBy)
  formVersions: FormVersions[];

  @OneToMany(() => LoginAuditLogs, (loginAuditLogs) => loginAuditLogs.user)
  loginAuditLogs: LoginAuditLogs[];

  @OneToMany(
    () => SubmissionAuditLogs,
    (submissionAuditLogs) => submissionAuditLogs.actionByUser,
  )
  submissionAuditLogs: SubmissionAuditLogs[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.assignedByUser)
  userRoles2: UserRoles[];

  // Explicit FK column — allows direct reads/writes without loading the relation
  @Column('int', { name: 'DirectorateId', nullable: true })
  directorateId: number | null;

  @ManyToOne(() => Directorates, (directorates) => directorates.users)
  @JoinColumn([
    { name: 'DirectorateId', referencedColumnName: 'directorateId' },
  ])
  directorate: Directorates;

  @OneToMany(() => UserSessions, (userSessions) => userSessions.user)
  userSessions: UserSessions[];
}
