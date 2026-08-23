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
import { LookupValues } from './LookupValues';

@Index('PK__FormSubm__3214EC073BE0FD4B', ['id'], { unique: true })
@Entity('FormSubmissionMultiValues', { schema: 'dbo' })
export class FormSubmissionMultiValues {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
  id: string;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @ManyToOne(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.formSubmissionMultiValues,
  )
  @JoinColumn([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }])
  submission: FormSubmissions;

  @ManyToOne(
    () => FormFields,
    (formFields) => formFields.formSubmissionMultiValues,
  )
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;

  @ManyToOne(
    () => LookupValues,
    (lookupValues) => lookupValues.formSubmissionMultiValues,
  )
  @JoinColumn([
    { name: 'LookupValueId', referencedColumnName: 'lookupValueId' },
  ])
  lookupValue: LookupValues;
}
