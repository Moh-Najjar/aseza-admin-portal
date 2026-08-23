import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissionMultiValues } from './FormSubmissionMultiValues';
import { LookupTypes } from './LookupTypes';

@Index('PK__LookupVa__BFA1132CD7C2F349', ['lookupValueId'], { unique: true })
@Entity('LookupValues', { schema: 'dbo' })
export class LookupValues {
  @PrimaryGeneratedColumn({ type: 'int', name: 'LookupValueId' })
  lookupValueId: number;

  @Column('nvarchar', { name: 'Code', nullable: true, length: 50 })
  code: string | null;

  @Column('nvarchar', { name: 'NameEn', length: 100 })
  nameEn: string;

  @Column('nvarchar', { name: 'NameAr', length: 100 })
  nameAr: string;

  @Column('bit', { name: 'IsActive', nullable: true, default: () => '(1)' })
  isActive: boolean | null;

  @OneToMany(
    () => FormSubmissionMultiValues,
    (formSubmissionMultiValues) => formSubmissionMultiValues.lookupValue,
  )
  formSubmissionMultiValues: FormSubmissionMultiValues[];

  @ManyToOne(() => LookupTypes, (lookupTypes) => lookupTypes.lookupValues)
  @JoinColumn([{ name: 'LookupTypeId', referencedColumnName: 'lookupTypeId' }])
  lookupType: LookupTypes;

  @ManyToOne(() => LookupValues, (lookupValues) => lookupValues.lookupValues)
  @JoinColumn([{ name: 'ParentId', referencedColumnName: 'lookupValueId' }])
  parent: LookupValues;

  @OneToMany(() => LookupValues, (lookupValues) => lookupValues.parent)
  lookupValues: LookupValues[];
}
