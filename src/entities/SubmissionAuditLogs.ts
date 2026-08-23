import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissions } from './FormSubmissions';
import { Users } from './Users';

@Index('PK__Submissi__A17F23986616F26B', ['auditId'], { unique: true })
@Entity('SubmissionAuditLogs', { schema: 'dbo' })
export class SubmissionAuditLogs {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'AuditId' })
  auditId: string;

  @Column('nvarchar', { name: 'ActionType', length: 50 })
  actionType: string;

  @Column('nvarchar', { name: 'FieldKey', nullable: true, length: 100 })
  fieldKey: string | null;

  @Column('nvarchar', { name: 'OldValue', nullable: true })
  oldValue: string | null;

  @Column('nvarchar', { name: 'NewValue', nullable: true })
  newValue: string | null;

  @Column('datetime2', { name: 'ActionAt', default: () => 'sysutcdatetime()' })
  actionAt: Date;

  @Column('nvarchar', { name: 'Comment', nullable: true, length: 1000 })
  comment: string | null;

  @Column('nvarchar', { name: 'IpAddress', nullable: true, length: 50 })
  ipAddress: string | null;

  @ManyToOne(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.submissionAuditLogs,
  )
  @JoinColumn([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }])
  submission: FormSubmissions;

  @ManyToOne(() => Users, (users) => users.submissionAuditLogs)
  @JoinColumn([{ name: 'ActionByUserId', referencedColumnName: 'userId' }])
  actionByUser: Users;
}
