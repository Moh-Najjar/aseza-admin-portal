import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissions } from './FormSubmissions';
import { FormFields } from './FormFields';

@Index('PK__FormSubm__BCB0EDAC0139CFD3', ['submissionValueId'], {
  unique: true,
})
@Index('UQ_SubValues_Sub_Field', ['submissionId', 'fieldId'], { unique: true })
@Entity('FormSubmissionValues', { schema: 'dbo' })
export class FormSubmissionValues {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'SubmissionValueId' })
  submissionValueId: string;

  @Column('bigint', { name: 'SubmissionId', unique: true })
  submissionId: string;

  @Column('int', { name: 'FieldId', unique: true })
  fieldId: number;

  @Column('nvarchar', { name: 'FieldKey', length: 100 })
  fieldKey: string;

  @Column('nvarchar', { name: 'ValueString', nullable: true })
  valueString: string | null;

  @Column('bigint', { name: 'ValueNumber', nullable: true })
  valueNumber: string | null;

  @Column('decimal', {
    name: 'ValueDecimal',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  valueDecimal: number | null;

  @Column('date', { name: 'ValueDate', nullable: true })
  valueDate: Date | null;

  @Column('bit', { name: 'ValueBoolean', nullable: true })
  valueBoolean: boolean | null;

  @Column('nvarchar', { name: 'ValueJson', nullable: true })
  valueJson: string | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @ManyToOne(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.formSubmissionValues,
  )
  @JoinColumn([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }])
  submission: FormSubmissions;

  @ManyToOne(() => FormFields, (formFields) => formFields.formSubmissionValues)
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;
}
