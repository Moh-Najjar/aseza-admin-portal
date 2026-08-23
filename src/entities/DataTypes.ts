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
import { KpiDefinitions } from './KpiDefinitions';

@Index('PK__DataType__4382081F2203AF0D', ['dataTypeId'], { unique: true })
@Index('UQ__DataType__EDA22245378D31F0', ['typeKey'], { unique: true })
@Entity('DataTypes', { schema: 'dbo' })
export class DataTypes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DataTypeId' })
  dataTypeId: number;

  @Column('nvarchar', { name: 'TypeKey', unique: true, length: 50 })
  typeKey: string;

  @Column('nvarchar', { name: 'TypeName', length: 100 })
  typeName: string;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 300 })
  description: string | null;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => FormFieldCalculationInputs,
    (formFieldCalculationInputs) => formFieldCalculationInputs.dataType,
  )
  formFieldCalculationInputs: FormFieldCalculationInputs[];

  @OneToMany(
    () => FormFieldCalculations,
    (formFieldCalculations) => formFieldCalculations.resultDataType,
  )
  formFieldCalculations: FormFieldCalculations[];

  @OneToMany(
    () => FormFieldColumns,
    (formFieldColumns) => formFieldColumns.dataType,
  )
  formFieldColumns: FormFieldColumns[];

  @OneToMany(() => FormFields, (formFields) => formFields.dataType)
  formFields: FormFields[];

  @OneToMany(() => KpiDefinitions, (kpiDefinitions) => kpiDefinitions.dataType)
  kpiDefinitions: KpiDefinitions[];
}
