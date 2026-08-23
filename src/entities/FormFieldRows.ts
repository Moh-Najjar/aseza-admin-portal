import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFields } from './FormFields';

@Index('PK_FormFieldRows', ['rowId'], { unique: true })
@Index('UQ_FormFieldRows_FieldId_RowKey', ['fieldId', 'rowKey'], {
  unique: true,
})
@Entity('FormFieldRows', { schema: 'dbo' })
export class FormFieldRows {
  @PrimaryGeneratedColumn({ type: 'int', name: 'RowId' })
  rowId: number;

  @Column('int', { name: 'FieldId', unique: true })
  fieldId: number;

  @Column('nvarchar', { name: 'RowKey', unique: true, length: 100 })
  rowKey: string;

  @Column('nvarchar', { name: 'LabelEn', length: 300 })
  labelEn: string;

  @Column('nvarchar', { name: 'LabelAr', nullable: true, length: 300 })
  labelAr: string | null;

  @Column('int', { name: 'DisplayOrder', default: () => '(0)' })
  displayOrder: number;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @Column('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 300 })
  placeholderEn: string | null;

  @Column('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 300 })
  placeholderAr: string | null;

  @Column('bit', { name: 'IsRequired', nullable: true })
  isRequired: boolean | null;

  @Column('bit', { name: 'IsReadOnly', nullable: true })
  isReadOnly: boolean | null;

  @Column('bit', { name: 'IsVisible', nullable: true })
  isVisible: boolean | null;

  @Column('nvarchar', { name: 'DefaultValue', nullable: true })
  defaultValue: string | null;

  @Column('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 })
  helpTextEn: string | null;

  @Column('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 })
  helpTextAr: string | null;

  @Column('nvarchar', {
    name: 'ValidationMessageEn',
    nullable: true,
    length: 500,
  })
  validationMessageEn: string | null;

  @Column('nvarchar', {
    name: 'ValidationMessageAr',
    nullable: true,
    length: 500,
  })
  validationMessageAr: string | null;

  @ManyToOne(() => FormFields, (formFields) => formFields.formFieldRows)
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;
}
