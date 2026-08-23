import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFields } from './FormFields';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';
import { LookupTypes } from './LookupTypes';

@Index('PK__FormFiel__1AA1420FCEAE5CF0', ['columnId'], { unique: true })
@Entity('FormFieldColumns', { schema: 'dbo' })
export class FormFieldColumns {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ColumnId' })
  columnId: number;

  @Column('nvarchar', { name: 'ColumnKey', length: 100 })
  columnKey: string;

  @Column('nvarchar', { name: 'LabelEn', length: 200 })
  labelEn: string;

  @Column('nvarchar', { name: 'LabelAr', length: 200 })
  labelAr: string;

  @Column('int', { name: 'DisplayOrder', default: () => '(0)' })
  displayOrder: number;

  // Explicit FK columns
  @Column('int', { name: 'FieldId' })
  fieldId: number;

  @Column('int', { name: 'DataTypeId' })
  dataTypeId: number;

  @Column('int', { name: 'ControlTypeId' })
  controlTypeId: number;

  @Column('int', { name: 'LookupTypeId', nullable: true })
  lookupTypeId: number | null;

  @ManyToOne(() => FormFields, (formFields) => formFields.formFieldColumns)
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;

  @ManyToOne(() => DataTypes, (dataTypes) => dataTypes.formFieldColumns)
  @JoinColumn([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }])
  dataType: DataTypes;

  @ManyToOne(
    () => ControlTypes,
    (controlTypes) => controlTypes.formFieldColumns,
  )
  @JoinColumn([
    { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
  ])
  controlType: ControlTypes;

  @ManyToOne(() => LookupTypes, (lookupTypes) => lookupTypes.formFieldColumns)
  @JoinColumn([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }])
  lookupType: LookupTypes;
}
