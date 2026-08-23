import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFieldCalculations } from './FormFieldCalculations';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';

@Index('PK_FormFieldCalculationInputs', ['inputId'], { unique: true })
@Index('UQ_CalcInputs_CalcId_ColumnKey', ['calculationId', 'columnKey'], {
  unique: true,
})
@Index('UQ_CalcInputs_CalcId_Token', ['calculationId', 'inputToken'], {
  unique: true,
})
@Entity('FormFieldCalculationInputs', { schema: 'dbo' })
export class FormFieldCalculationInputs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'InputId' })
  inputId: number;

  @Column('int', { name: 'CalculationId', unique: true })
  calculationId: number;

  @Column('nvarchar', { name: 'InputToken', unique: true, length: 50 })
  inputToken: string;

  @Column('nvarchar', { name: 'ColumnKey', unique: true, length: 100 })
  columnKey: string;

  @Column('nvarchar', { name: 'LabelEn', length: 200 })
  labelEn: string;

  @Column('nvarchar', { name: 'LabelAr', length: 200 })
  labelAr: string;

  @Column('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 200 })
  placeholderEn: string | null;

  @Column('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 200 })
  placeholderAr: string | null;

  @Column('int', { name: 'DisplayOrder', default: () => '(0)' })
  displayOrder: number;

  @Column('bit', { name: 'IsRequired', default: () => '(1)' })
  isRequired: boolean;

  @Column('bit', { name: 'IsReadOnly', default: () => '(0)' })
  isReadOnly: boolean;

  @Column('bit', { name: 'IsVisible', default: () => '(1)' })
  isVisible: boolean;

  @Column('nvarchar', {
    name: 'ValidationMessageEn',
    nullable: true,
    length: 300,
  })
  validationMessageEn: string | null;

  @Column('nvarchar', {
    name: 'ValidationMessageAr',
    nullable: true,
    length: 300,
  })
  validationMessageAr: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  // Explicit FK columns
  @Column('int', { name: 'DataTypeId' })
  dataTypeId: number;

  @Column('int', { name: 'ControlTypeId' })
  controlTypeId: number;

  @ManyToOne(
    () => FormFieldCalculations,
    (formFieldCalculations) => formFieldCalculations.formFieldCalculationInputs,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'CalculationId', referencedColumnName: 'calculationId' },
  ])
  calculation: FormFieldCalculations;

  @ManyToOne(
    () => DataTypes,
    (dataTypes) => dataTypes.formFieldCalculationInputs,
  )
  @JoinColumn([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }])
  dataType: DataTypes;

  @ManyToOne(
    () => ControlTypes,
    (controlTypes) => controlTypes.formFieldCalculationInputs,
  )
  @JoinColumn([
    { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
  ])
  controlType: ControlTypes;
}
