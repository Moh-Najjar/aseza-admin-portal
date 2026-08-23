import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFieldCalculationInputs } from './FormFieldCalculationInputs';
import { FormFields } from './FormFields';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';

@Index('PK_FormFieldCalculations', ['calculationId'], { unique: true })
@Index('UQ_FormFieldCalculations_FieldId', ['fieldId'], { unique: true })
@Entity('FormFieldCalculations', { schema: 'dbo' })
export class FormFieldCalculations {
  @PrimaryGeneratedColumn({ type: 'int', name: 'CalculationId' })
  calculationId: number;

  @Column('int', { name: 'FieldId', unique: true })
  fieldId: number;

  @Column('nvarchar', { name: 'FormulaExpression', length: 500 })
  formulaExpression: string;

  @Column('nvarchar', {
    name: 'ResultColumnKey',
    length: 100,
    default: () => "'RESULT'",
  })
  resultColumnKey: string;

  @Column('nvarchar', {
    name: 'ResultLabelEn',
    length: 200,
    default: () => "'Result'",
  })
  resultLabelEn: string;

  @Column('nvarchar', {
    name: 'ResultLabelAr',
    length: 200,
    default: () => "N'النتيجة'",
  })
  resultLabelAr: string;

  @Column('int', { name: 'ResultPrecision', default: () => '(2)' })
  resultPrecision: number;

  @Column('nvarchar', { name: 'ButtonLabelEn', nullable: true, length: 100 })
  buttonLabelEn: string | null;

  @Column('nvarchar', { name: 'ButtonLabelAr', nullable: true, length: 100 })
  buttonLabelAr: string | null;

  @Column('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 })
  helpTextEn: string | null;

  @Column('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 })
  helpTextAr: string | null;

  @Column('nvarchar', { name: 'DisplayFormulaEn', nullable: true, length: 500 })
  displayFormulaEn: string | null;

  @Column('nvarchar', { name: 'DisplayFormulaAr', nullable: true, length: 500 })
  displayFormulaAr: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  // Explicit FK columns
  @Column('int', { name: 'ResultDataTypeId' })
  resultDataTypeId: number;

  @Column('int', { name: 'ResultControlTypeId' })
  resultControlTypeId: number;

  @OneToMany(
    () => FormFieldCalculationInputs,
    (formFieldCalculationInputs) => formFieldCalculationInputs.calculation,
  )
  formFieldCalculationInputs: FormFieldCalculationInputs[];

  @OneToOne(
    () => FormFields,
    (formFields) => formFields.formFieldCalculations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;

  @ManyToOne(() => DataTypes, (dataTypes) => dataTypes.formFieldCalculations)
  @JoinColumn([
    { name: 'ResultDataTypeId', referencedColumnName: 'dataTypeId' },
  ])
  resultDataType: DataTypes;

  @ManyToOne(
    () => ControlTypes,
    (controlTypes) => controlTypes.formFieldCalculations,
  )
  @JoinColumn([
    { name: 'ResultControlTypeId', referencedColumnName: 'controlTypeId' },
  ])
  resultControlType: ControlTypes;
}
