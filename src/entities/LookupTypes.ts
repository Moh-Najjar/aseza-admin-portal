import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormFieldColumns } from './FormFieldColumns';
import { FormFields } from './FormFields';
import { LookupValues } from './LookupValues';

@Index('PK__LookupTy__15BEA5E1CBF88929', ['lookupTypeId'], { unique: true })
@Index('UQ__LookupTy__A25C5AA750EA36C9', ['code'], { unique: true })
@Entity('LookupTypes', { schema: 'dbo' })
export class LookupTypes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'LookupTypeId' })
  lookupTypeId: number;

  @Column('nvarchar', { name: 'Code', unique: true, length: 50 })
  code: string;

  @Column('nvarchar', { name: 'NameEn', length: 100 })
  nameEn: string;

  @Column('nvarchar', { name: 'NameAr', length: 100 })
  nameAr: string;

  @Column('bit', { name: 'IsActive', nullable: true, default: () => '(1)' })
  isActive: boolean | null;

  @OneToMany(
    () => FormFieldColumns,
    (formFieldColumns) => formFieldColumns.lookupType,
  )
  formFieldColumns: FormFieldColumns[];

  @OneToMany(() => FormFields, (formFields) => formFields.lookupType)
  formFields: FormFields[];

  @OneToMany(() => LookupValues, (lookupValues) => lookupValues.lookupType)
  lookupValues: LookupValues[];
}
