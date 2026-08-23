import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFields } from './FormFields';

@Index('PK__FieldOpt__92C7A1FF2765A8C2', ['optionId'], { unique: true })
@Index('UQ_FieldOptions_Field_OptionKey', ['fieldId', 'optionKey'], {
  unique: true,
})
@Entity('FieldOptions', { schema: 'dbo' })
export class FieldOptions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'OptionId' })
  optionId: number;

  @Column('int', { name: 'FieldId', unique: true })
  fieldId: number;

  @Column('nvarchar', { name: 'OptionKey', unique: true, length: 100 })
  optionKey: string;

  @Column('nvarchar', { name: 'OptionLabelEn', length: 200 })
  optionLabelEn: string;

  @Column('nvarchar', { name: 'OptionLabelAr', length: 200 })
  optionLabelAr: string;

  @Column('nvarchar', { name: 'OptionValue', length: 100 })
  optionValue: string;

  @Column('int', { name: 'DisplayOrder' })
  displayOrder: number;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @ManyToOne(() => FormFields, (formFields) => formFields.fieldOptions)
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;
}
