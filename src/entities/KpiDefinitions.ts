import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFields } from './FormFields';
import { FormSubmissions } from './FormSubmissions';
import { Directorates } from './Directorates';
import { DataTypes } from './DataTypes';
import { Frequencies } from './Frequencies';
import { KpiSubmissionPeriods } from './KpiSubmissionPeriods';

@Index('PK__KpiDefin__8C69D5BE67C0229B', ['kpiId'], { unique: true })
@Index('UQ__KpiDefin__692F84FBCF934F62', ['kpiCode'], { unique: true })
@Entity('KpiDefinitions', { schema: 'dbo' })
export class KpiDefinitions {
  // Definite assignment (!) — TypeORM populates these at runtime
  @PrimaryGeneratedColumn({ type: 'int', name: 'KpiId' })
  kpiId!: number;

  @Column('nvarchar', { name: 'KpiCode', unique: true, length: 50 })
  kpiCode!: string;

  @Column('nvarchar', { name: 'NameEn', length: 300 })
  nameEn!: string;

  @Column('nvarchar', { name: 'NameAr', length: 300 })
  nameAr!: string;

  @Column('decimal', {
    name: 'TargetValue',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  targetValue!: number | null;

  @Column('nvarchar', { name: 'UnitEn', nullable: true, length: 100 })
  unitEn!: string | null;

  @Column('nvarchar', { name: 'UnitAr', nullable: true, length: 100 })
  unitAr!: string | null;

  @Column('nvarchar', { name: 'ThemeEn', nullable: true, length: 200 })
  themeEn!: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive!: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt!: Date;

  @Column('date', { name: 'ReferenceDate', nullable: true })
  referenceDate!: Date | null;

  // Explicit FK columns — required for direct inserts without loading relations
  @Column('int', { name: 'DirectorateId' })
  directorateId!: number;

  @Column('int', { name: 'DataTypeId' })
  dataTypeId!: number;

  @Column('int', { name: 'FrequencyId', nullable: true })
  frequencyId!: number | null;

  @OneToMany(() => FormFields, (formFields) => formFields.kpi)
  formFields!: FormFields[];

  @OneToMany(() => FormSubmissions, (formSubmissions) => formSubmissions.kpi)
  formSubmissions!: FormSubmissions[];

  @ManyToOne(() => Directorates, (directorates) => directorates.kpiDefinitions)
  @JoinColumn([
    { name: 'DirectorateId', referencedColumnName: 'directorateId' },
  ])
  directorate!: Directorates;

  @ManyToOne(() => DataTypes, (dataTypes) => dataTypes.kpiDefinitions)
  @JoinColumn([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }])
  dataType!: DataTypes;

  // FrequencyId is nullable in DB — keep relation nullable to avoid INNER JOIN drops
  @ManyToOne(() => Frequencies, (frequencies) => frequencies.kpiDefinitions, {
    nullable: true,
  })
  @JoinColumn([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }])
  frequency!: Frequencies | null;

  @OneToMany(
    () => KpiSubmissionPeriods,
    (kpiSubmissionPeriods) => kpiSubmissionPeriods.kpi,
  )
  kpiSubmissionPeriods!: KpiSubmissionPeriods[];
}
