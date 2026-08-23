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
import { FieldDependencies } from './FieldDependencies';
import { FieldOptions } from './FieldOptions';
import { FormFieldCalculations } from './FormFieldCalculations';
import { FormFieldColumns } from './FormFieldColumns';
import { FormFieldRows } from './FormFieldRows';
import { Forms } from './Forms';
import { DataTypes } from './DataTypes';
import { ControlTypes } from './ControlTypes';
import { LookupTypes } from './LookupTypes';
import { KpiDefinitions } from './KpiDefinitions';
import { FormSubmissionMultiValues } from './FormSubmissionMultiValues';
import { FormSubmissionTableValues } from './FormSubmissionTableValues';
import { FormSubmissionValues } from './FormSubmissionValues';

@Index('PK__FormFiel__C8B6FF074E59B510', ['fieldId'], { unique: true })
@Index('UQ_FormFields_Form_FieldKey', ['formId', 'fieldKey'], { unique: true })
@Entity('FormFields', { schema: 'dbo' })
export class FormFields {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FieldId' })
  fieldId: number;

  @Column('int', { name: 'FormId', unique: true })
  formId: number;

  @Column('nvarchar', { name: 'FieldKey', unique: true, length: 100 })
  fieldKey: string;

  @Column('nvarchar', { name: 'LabelEn', length: 200 })
  labelEn: string;

  @Column('nvarchar', { name: 'LabelAr', length: 200 })
  labelAr: string;

  @Column('bit', { name: 'IsRequired', default: () => '(0)' })
  isRequired: boolean;

  @Column('decimal', {
    name: 'MinValue',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  minValue: number | null;

  @Column('decimal', {
    name: 'MaxValue',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  maxValue: number | null;

  @Column('int', { name: 'MinLength', nullable: true })
  minLength: number | null;

  @Column('int', { name: 'MaxLength', nullable: true })
  maxLength: number | null;

  @Column('nvarchar', { name: 'RegexPattern', nullable: true, length: 500 })
  regexPattern: string | null;

  @Column('nvarchar', { name: 'PlaceholderEn', nullable: true, length: 200 })
  placeholderEn: string | null;

  @Column('nvarchar', { name: 'PlaceholderAr', nullable: true, length: 200 })
  placeholderAr: string | null;

  @Column('nvarchar', { name: 'DefaultValue', nullable: true, length: 500 })
  defaultValue: string | null;

  @Column('int', { name: 'DisplayOrder' })
  displayOrder: number;

  @Column('nvarchar', { name: 'HelpTextEn', nullable: true, length: 500 })
  helpTextEn: string | null;

  @Column('nvarchar', { name: 'HelpTextAr', nullable: true, length: 500 })
  helpTextAr: string | null;

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

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  // Explicit FK columns
  @Column('int', { name: 'DataTypeId' })
  dataTypeId: number;

  @Column('int', { name: 'ControlTypeId' })
  controlTypeId: number;

  @Column('int', { name: 'LookupTypeId', nullable: true })
  lookupTypeId: number | null;

  @Column('int', { name: 'KpiId', nullable: true })
  kpiId: number | null;

  @OneToMany(
    () => FieldDependencies,
    (fieldDependencies) => fieldDependencies.field,
  )
  fieldDependencies: FieldDependencies[];

  @OneToMany(
    () => FieldDependencies,
    (fieldDependencies) => fieldDependencies.dependsOnField,
  )
  fieldDependencies2: FieldDependencies[];

  @OneToMany(() => FieldOptions, (fieldOptions) => fieldOptions.field)
  fieldOptions: FieldOptions[];

  @OneToOne(
    () => FormFieldCalculations,
    (formFieldCalculations) => formFieldCalculations.field,
  )
  formFieldCalculations: FormFieldCalculations;

  @OneToMany(
    () => FormFieldColumns,
    (formFieldColumns) => formFieldColumns.field,
  )
  formFieldColumns: FormFieldColumns[];

  @OneToMany(() => FormFieldRows, (formFieldRows) => formFieldRows.field)
  formFieldRows: FormFieldRows[];

  @ManyToOne(() => Forms, (forms) => forms.formFields)
  @JoinColumn([{ name: 'FormId', referencedColumnName: 'formId' }])
  form: Forms;

  @ManyToOne(() => DataTypes, (dataTypes) => dataTypes.formFields)
  @JoinColumn([{ name: 'DataTypeId', referencedColumnName: 'dataTypeId' }])
  dataType: DataTypes;

  @ManyToOne(() => ControlTypes, (controlTypes) => controlTypes.formFields)
  @JoinColumn([
    { name: 'ControlTypeId', referencedColumnName: 'controlTypeId' },
  ])
  controlType: ControlTypes;

  @ManyToOne(() => LookupTypes, (lookupTypes) => lookupTypes.formFields)
  @JoinColumn([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }])
  lookupType: LookupTypes;

  @ManyToOne(
    () => KpiDefinitions,
    (kpiDefinitions) => kpiDefinitions.formFields,
  )
  @JoinColumn([{ name: 'KpiId', referencedColumnName: 'kpiId' }])
  kpi: KpiDefinitions;

  @OneToMany(
    () => FormSubmissionMultiValues,
    (formSubmissionMultiValues) => formSubmissionMultiValues.field,
  )
  formSubmissionMultiValues: FormSubmissionMultiValues[];

  @OneToMany(
    () => FormSubmissionTableValues,
    (formSubmissionTableValues) => formSubmissionTableValues.field,
  )
  formSubmissionTableValues: FormSubmissionTableValues[];

  @OneToMany(
    () => FormSubmissionValues,
    (formSubmissionValues) => formSubmissionValues.field,
  )
  formSubmissionValues: FormSubmissionValues[];
}
