import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFields } from './FormFields';

@Index('PK__FieldDep__A0D1A562E6A43FAA', ['dependencyId'], { unique: true })
@Entity('FieldDependencies', { schema: 'dbo' })
export class FieldDependencies {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DependencyId' })
  dependencyId: number;

  @Column('nvarchar', { name: 'ConditionOperator', length: 20 })
  conditionOperator: string;

  @Column('nvarchar', { name: 'ConditionValue', length: 200 })
  conditionValue: string;

  @Column('nvarchar', { name: 'Action', length: 20, default: () => "'SHOW'" })
  action: string;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  // Explicit FK columns
  @Column('int', { name: 'FieldId' })
  fieldId: number;

  @Column('int', { name: 'DependsOnFieldId' })
  dependsOnFieldId: number;

  @ManyToOne(() => FormFields, (formFields) => formFields.fieldDependencies)
  @JoinColumn([{ name: 'FieldId', referencedColumnName: 'fieldId' }])
  field: FormFields;

  @ManyToOne(() => FormFields, (formFields) => formFields.fieldDependencies2)
  @JoinColumn([{ name: 'DependsOnFieldId', referencedColumnName: 'fieldId' }])
  dependsOnField: FormFields;
}
