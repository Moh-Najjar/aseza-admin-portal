import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Forms } from './Forms';
import { KpiDefinitions } from './KpiDefinitions';
import { KpiSubmissionPeriods } from './KpiSubmissionPeriods';

@Index('PK__Frequenc__59247498621A3156', ['frequencyId'], { unique: true })
@Index('UQ__Frequenc__A25C5AA7C53554EA', ['code'], { unique: true })
@Entity('Frequencies', { schema: 'dbo' })
export class Frequencies {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FrequencyId' })
  frequencyId: number;

  @Column('nvarchar', { name: 'Code', unique: true, length: 50 })
  code: string;

  @Column('nvarchar', { name: 'NameEn', length: 100 })
  nameEn: string;

  @Column('nvarchar', { name: 'NameAr', length: 100 })
  nameAr: string;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 300 })
  description: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(() => Forms, (forms) => forms.frequency)
  forms: Forms[];

  @OneToMany(() => KpiDefinitions, (kpiDefinitions) => kpiDefinitions.frequency)
  kpiDefinitions: KpiDefinitions[];

  @OneToMany(
    () => KpiSubmissionPeriods,
    (kpiSubmissionPeriods) => kpiSubmissionPeriods.frequency,
  )
  kpiSubmissionPeriods: KpiSubmissionPeriods[];
}
