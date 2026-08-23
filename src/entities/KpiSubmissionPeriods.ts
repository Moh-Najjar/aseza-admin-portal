import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissions } from './FormSubmissions';
import { KpiDefinitions } from './KpiDefinitions';
import { Frequencies } from './Frequencies';

@Index('IX_Ksp_Kpi_PeriodStart', ['kpiId', 'periodStartDate'], {})
@Index('IX_Ksp_SubmissionId', ['submissionId'], {})
@Index('PK_KpiSubmissionPeriods', ['kpiSubmissionPeriodId'], { unique: true })
@Index(
  'UX_Ksp_Blocking',
  ['directorateId', 'kpiId', 'frequencyId', 'periodStartDate'],
  { unique: true },
)
@Entity('KpiSubmissionPeriods', { schema: 'dbo' })
export class KpiSubmissionPeriods {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'KpiSubmissionPeriodId' })
  kpiSubmissionPeriodId: string;

  @Column('bigint', { name: 'SubmissionId' })
  submissionId: string;

  @Column('int', { name: 'DirectorateId' })
  directorateId: number;

  @Column('int', { name: 'KpiId' })
  kpiId: number;

  @Column('int', { name: 'FrequencyId' })
  frequencyId: number;

  @Column('date', { name: 'PeriodStartDate' })
  periodStartDate: Date;

  @Column('nvarchar', { name: 'SubmissionStatus', length: 50 })
  submissionStatus: string;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @ManyToOne(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.kpiSubmissionPeriods,
  )
  @JoinColumn([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }])
  submission: FormSubmissions;

  @ManyToOne(
    () => KpiDefinitions,
    (kpiDefinitions) => kpiDefinitions.kpiSubmissionPeriods,
  )
  @JoinColumn([{ name: 'KpiId', referencedColumnName: 'kpiId' }])
  kpi: KpiDefinitions;

  @ManyToOne(
    () => Frequencies,
    (frequencies) => frequencies.kpiSubmissionPeriods,
  )
  @JoinColumn([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }])
  frequency: Frequencies;
}
