import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DirectorateFormAccess } from './DirectorateFormAccess';
import { Forms } from './Forms';
import { FormSubmissions } from './FormSubmissions';
import { KpiDefinitions } from './KpiDefinitions';
import { Users } from './Users';

@Index('PK__Director__4E9D6F427427F419', ['directorateId'], { unique: true })
@Index('UQ__Director__9877E62CCB658F4C', ['directorateKey'], { unique: true })
@Entity('Directorates', { schema: 'dbo' })
export class Directorates {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DirectorateId' })
  directorateId: number;

  @Column('nvarchar', { name: 'DirectorateKey', unique: true, length: 100 })
  directorateKey: string;

  @Column('nvarchar', { name: 'NameEn', length: 200 })
  nameEn: string;

  @Column('nvarchar', { name: 'NameAr', length: 200 })
  nameAr: string;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => DirectorateFormAccess,
    (directorateFormAccess) => directorateFormAccess.directorate,
  )
  directorateFormAccesses: DirectorateFormAccess[];

  @OneToMany(() => Forms, (forms) => forms.directorate)
  forms: Forms[];

  @OneToMany(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.directorate,
  )
  formSubmissions: FormSubmissions[];

  @OneToMany(
    () => KpiDefinitions,
    (kpiDefinitions) => kpiDefinitions.directorate,
  )
  kpiDefinitions: KpiDefinitions[];

  @OneToMany(() => Users, (users) => users.directorate)
  users: Users[];
}
