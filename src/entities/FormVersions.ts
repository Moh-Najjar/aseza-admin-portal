import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormSubmissions } from './FormSubmissions';
import { Forms } from './Forms';
import { Users } from './Users';

@Index('PK__FormVers__2ADD4DA7956D2BA9', ['formVersionId'], { unique: true })
@Index('UQ_FormVersions', ['formId', 'version'], { unique: true })
@Entity('FormVersions', { schema: 'dbo' })
export class FormVersions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FormVersionId' })
  formVersionId: number;

  @Column('int', { name: 'FormId', unique: true })
  formId: number;

  @Column('int', { name: 'Version', unique: true })
  version: number;

  @Column('nvarchar', { name: 'SchemaSnapshotJson' })
  schemaSnapshotJson: string;

  @Column('nvarchar', { name: 'ChangeNotes', nullable: true, length: 1000 })
  changeNotes: string | null;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @OneToMany(
    () => FormSubmissions,
    (formSubmissions) => formSubmissions.formVersion,
  )
  formSubmissions: FormSubmissions[];

  @ManyToOne(() => Forms, (forms) => forms.formVersions)
  @JoinColumn([{ name: 'FormId', referencedColumnName: 'formId' }])
  form: Forms;

  @ManyToOne(() => Users, (users) => users.formVersions)
  @JoinColumn([{ name: 'CreatedBy', referencedColumnName: 'userId' }])
  createdBy: Users;
}
