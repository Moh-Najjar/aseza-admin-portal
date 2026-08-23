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

@Index('PK__FormSubm__3214EC07D4F5CEAD', ['id'], { unique: true })
@Entity('FormSubmissionTableValues', { schema: 'dbo' })
export class FormSubmissionTableValues {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
  id: string;

  @Column('int', { name: 'RowIndex' })
  rowIndex: number;

  @Column('nvarchar', { name: 'ColumnKey', length: 100 })
  columnKey: string;

  @Column('nvarchar', { name: 'ValueString', nullable: true })
  valueString: string | null;

  @Column('decimal', {
    name: 'ValueNumber',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  valueNumber: number | null;

  @Column('date', { name: 'ValueDate', nullable: true })
  valueDate: Date | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @ManyToOne(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.formSubmissionTableValues,
  )
  @JoinColumn([{ name: 'SubmissionId', referencedColumnName: 'submissionId' }])
  submission: FormSubmissions;

  @ManyToOne(
    () => FormFields,
    (formFields) => formFields.formSubmissionTableValues,
  )
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;
}
