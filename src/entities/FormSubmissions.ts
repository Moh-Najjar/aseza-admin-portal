import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissionMultiValues } from './FormSubmissionMultiValues';
import { Forms } from './Forms';
import { Users } from './Users';
import { Directorates } from './Directorates';
import { FormVersions } from './FormVersions';
import { KpiDefinitions } from './KpiDefinitions';
import { FormSubmissionTableValues } from './FormSubmissionTableValues';
import { FormSubmissionValues } from './FormSubmissionValues';
import { KpiSubmissionPeriods } from './KpiSubmissionPeriods';
import { SubmissionAuditLogs } from './SubmissionAuditLogs';

@Index('IX_Submission_Status', ['submissionStatus'], {})
@Index('PK__FormSubm__449EE1252B0BB089', ['submissionId'], { unique: true })
@Index('UQ__FormSubm__C5ADBE4DDE7A8602', ['referenceNumber'], { unique: true })
@Entity('FormSubmissions', { schema: 'dbo' })
export class FormSubmissions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'SubmissionId' })
  submissionId: string;

  @Column('nvarchar', { name: 'ReferenceNumber', unique: true, length: 100 })
  referenceNumber: string;

  @Column('date', { name: 'ReportingDate' })
  reportingDate: Date;

  @Column('nvarchar', {
    name: 'SubmissionStatus',
    length: 50,
    default: () => "'Draft'",
  })
  submissionStatus: string;

  @Column('datetime2', { name: 'EnteredAt', default: () => 'sysutcdatetime()' })
  enteredAt: Date;

  @Column('datetime2', { name: 'UpdatedAt', nullable: true })
  updatedAt: Date | null;

  @Column('datetime2', { name: 'SubmittedAt', nullable: true })
  submittedAt: Date | null;

  @Column('datetime2', { name: 'ApprovedAt', nullable: true })
  approvedAt: Date | null;

  @Column('nvarchar', { name: 'RejectionReason', nullable: true, length: 1000 })
  rejectionReason: string | null;

  @Column('nvarchar', { name: 'Notes', nullable: true, length: 1000 })
  notes: string | null;

  @Column('nvarchar', {
    name: 'SourceType',
    length: 50,
    default: () => "'Manual'",
  })
  sourceType: string;

  @Column('int', { name: 'PeriodMonth', nullable: true })
  periodMonth: number | null;

  @Column('int', { name: 'PeriodYear', nullable: true })
  periodYear: number | null;

  @Column('uniqueidentifier', {
    name: 'CorrelationId',
    default: () => 'newid()',
  })
  correlationId: string;

  @Column('nvarchar', {
    name: 'ExportStatus',
    length: 50,
    default: () => "'Pending'",
  })
  exportStatus: string;

  @Column('datetime2', { name: 'ExportedAt', nullable: true })
  exportedAt: Date | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => FormSubmissionMultiValues,
    (formSubmissionMultiValues) => formSubmissionMultiValues.submission,
  )
  formSubmissionMultiValues: FormSubmissionMultiValues[];

  @ManyToOne(() => Forms, (forms) => forms.formSubmissions)
  @JoinColumn([{ name: 'FormId', referencedColumnName: 'formId' }])
  form: Forms;

  @ManyToOne(() => Users, (users) => users.formSubmissions)
  @JoinColumn([{ name: 'EnteredByUserId', referencedColumnName: 'userId' }])
  enteredByUser: Users;

  @ManyToOne(() => Users, (users) => users.formSubmissions2)
  @JoinColumn([{ name: 'UpdatedByUserId', referencedColumnName: 'userId' }])
  updatedByUser: Users;

  @ManyToOne(() => Users, (users) => users.formSubmissions3)
  @JoinColumn([{ name: 'ApprovedByUserId', referencedColumnName: 'userId' }])
  approvedByUser: Users;

  @ManyToOne(() => Directorates, (directorates) => directorates.formSubmissions)
  @JoinColumn([
    { name: 'DirectorateId', referencedColumnName: 'directorateId' },
  ])
  directorate: Directorates;

  @ManyToOne(() => FormVersions, (formVersions) => formVersions.formSubmissions)
  @JoinColumn([
    { name: 'FormVersionId', referencedColumnName: 'formVersionId' },
  ])
  formVersion: FormVersions;

  @ManyToOne(
    () => KpiDefinitions,
    (kpiDefinitions) => kpiDefinitions.formSubmissions,
  )
  @JoinColumn([{ name: 'KpiId', referencedColumnName: 'kpiId' }])
  kpi: KpiDefinitions;

  @OneToMany(
    () => FormSubmissionTableValues,
    (formSubmissionTableValues) => formSubmissionTableValues.submission,
  )
  formSubmissionTableValues: FormSubmissionTableValues[];

  @OneToMany(
    () => FormSubmissionValues,
    (formSubmissionValues) => formSubmissionValues.submission,
  )
  formSubmissionValues: FormSubmissionValues[];

  @OneToMany(
    () => KpiSubmissionPeriods,
    (kpiSubmissionPeriods) => kpiSubmissionPeriods.submission,
  )
  kpiSubmissionPeriods: KpiSubmissionPeriods[];

  @OneToMany(
    () => SubmissionAuditLogs,
    (submissionAuditLogs) => submissionAuditLogs.submission,
  )
  submissionAuditLogs: SubmissionAuditLogs[];
}
