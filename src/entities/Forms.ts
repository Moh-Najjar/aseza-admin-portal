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
import { FormFields } from './FormFields';
import { Directorates } from './Directorates';
import { Users } from './Users';
import { Frequencies } from './Frequencies';
import { FormSubmissions } from './FormSubmissions';
import { FormVersions } from './FormVersions';

@Index('PK__Forms__FB05B7DDA73446FE', ['formId'], { unique: true })
@Index('UQ__Forms__37A2B3BD5C3FC4B8', ['formKey'], { unique: true })
@Entity('Forms', { schema: 'dbo' })
export class Forms {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FormId' })
  formId: number;

  @Column('nvarchar', { name: 'FormKey', unique: true, length: 100 })
  formKey: string;

  @Column('nvarchar', { name: 'NameEn', length: 200 })
  nameEn: string;

  @Column('nvarchar', { name: 'NameAr', length: 200 })
  nameAr: string;

  @Column('nvarchar', { name: 'DescriptionEn', nullable: true, length: 1000 })
  descriptionEn: string | null;

  @Column('nvarchar', { name: 'DescriptionAr', nullable: true, length: 1000 })
  descriptionAr: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('int', { name: 'Version', default: () => '(1)' })
  version: number;

  @Column('date', { name: 'EffectiveFrom', nullable: true })
  effectiveFrom: Date | null;

  @Column('date', { name: 'EffectiveTo', nullable: true })
  effectiveTo: Date | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @Column('datetime2', { name: 'UpdatedAt', nullable: true })
  updatedAt: Date | null;

  // Explicit FK columns — allow direct reads/writes without loading relations
  @Column('int', { name: 'DirectorateId', nullable: true })
  directorateId: number | null;

  @Column('int', { name: 'FrequencyId', nullable: true })
  frequencyId: number | null;

  @Column('int', { name: 'CreatedBy', nullable: true })
  createdByUserId: number | null;

  @Column('int', { name: 'UpdatedBy', nullable: true })
  updatedByUserId: number | null;

  @OneToMany(
    () => DirectorateFormAccess,
    (directorateFormAccess) => directorateFormAccess.form,
  )
  directorateFormAccesses: DirectorateFormAccess[];

  @OneToMany(() => FormFields, (formFields) => formFields.form)
  formFields: FormFields[];

  @ManyToOne(() => Directorates, (directorates) => directorates.forms)
  @JoinColumn([
    { name: 'DirectorateId', referencedColumnName: 'directorateId' },
  ])
  directorate: Directorates;

  @ManyToOne(() => Users, (users) => users.forms)
  @JoinColumn([{ name: 'CreatedBy', referencedColumnName: 'userId' }])
  createdBy: Users;

  @ManyToOne(() => Users, (users) => users.forms2)
  @JoinColumn([{ name: 'UpdatedBy', referencedColumnName: 'userId' }])
  updatedBy: Users;

  @ManyToOne(() => Frequencies, (frequencies) => frequencies.forms)
  @JoinColumn([{ name: 'FrequencyId', referencedColumnName: 'frequencyId' }])
  frequency: Frequencies;

  @OneToMany(() => FormSubmissions, (formSubmissions) => formSubmissions.form)
  formSubmissions: FormSubmissions[];

  @OneToMany(() => FormVersions, (formVersions) => formVersions.form)
  formVersions: FormVersions[];
}
