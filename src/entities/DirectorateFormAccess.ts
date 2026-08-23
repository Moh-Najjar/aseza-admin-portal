import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Directorates } from './Directorates';
import { Forms } from './Forms';
import { Users } from './Users';

@Index('PK__Director__4130D05F2AF71EBC', ['accessId'], { unique: true })
@Index('UQ_DirFormAccess', ['directorateId', 'formId'], { unique: true })
@Entity('DirectorateFormAccess', { schema: 'dbo' })
export class DirectorateFormAccess {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AccessId' })
  accessId: number;

  @Column('int', { name: 'DirectorateId', unique: true })
  directorateId: number;

  @Column('int', { name: 'FormId', unique: true })
  formId: number;

  @Column('bit', { name: 'CanView', default: () => '(1)' })
  canView: boolean;

  @Column('bit', { name: 'CanSubmit', default: () => '(1)' })
  canSubmit: boolean;

  @Column('bit', { name: 'CanApprove', default: () => '(0)' })
  canApprove: boolean;

  @Column('datetime2', { name: 'GrantedAt', default: () => 'sysutcdatetime()' })
  grantedAt: Date;

  @ManyToOne(
    () => Directorates,
    (directorates) => directorates.directorateFormAccesses,
  )
  @JoinColumn([
    { name: 'DirectorateId', referencedColumnName: 'directorateId' },
  ])
  directorate: Directorates;

  @ManyToOne(() => Forms, (forms) => forms.directorateFormAccesses)
  @JoinColumn([{ name: 'FormId', referencedColumnName: 'formId' }])
  form: Forms;

  @ManyToOne(() => Users, (users) => users.directorateFormAccesses)
  @JoinColumn([{ name: 'GrantedBy', referencedColumnName: 'userId' }])
  grantedBy: Users;
}
