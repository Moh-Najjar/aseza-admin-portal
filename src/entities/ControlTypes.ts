import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFieldCalculationInputs } from './FormFieldCalculationInputs';
import { FormFieldCalculations } from './FormFieldCalculations';
import { FormFieldColumns } from './FormFieldColumns';
import { FormFields } from './FormFields';

@Index('PK__ControlT__3399DDEBD0E9A9E5', ['controlTypeId'], { unique: true })
@Index('UQ__ControlT__1C796A64D82DE9B3', ['controlKey'], { unique: true })
@Entity('ControlTypes', { schema: 'dbo' })
export class ControlTypes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ControlTypeId' })
  controlTypeId: number;

  @Column('nvarchar', { name: 'ControlKey', unique: true, length: 50 })
  controlKey: string;

  @Column('nvarchar', { name: 'ControlName', length: 100 })
  controlName: string;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 300 })
  description: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => FormFieldCalculationInputs,
    (formFieldCalculationInputs) => formFieldCalculationInputs.controlType,
  )
  formFieldCalculationInputs: FormFieldCalculationInputs[];

  @OneToMany(
    () => FormFieldCalculations,
    (formFieldCalculations) => formFieldCalculations.resultControlType,
  )
  formFieldCalculations: FormFieldCalculations[];

  @OneToMany(
    () => FormFieldColumns,
    (formFieldColumns) => formFieldColumns.controlType,
  )
  formFieldColumns: FormFieldColumns[];

  @OneToMany(() => FormFields, (formFields) => formFields.controlType)
  formFields: FormFields[];
}
