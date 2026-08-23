import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('IX_LoginAuditLogs_AttemptedAt', ['attemptedAt'], {})
@Index(
  'IX_LoginAuditLogs_IpAddress_AttemptedAt',
  ['ipAddress', 'attemptedAt'],
  {},
)
@Index('IX_LoginAuditLogs_UserId', ['userId'], {})
@Index('PK__LoginAud__3214EC076EFD8011', ['id'], { unique: true })
@Entity('LoginAuditLogs', { schema: 'dbo' })
export class LoginAuditLogs {
  @Column('uniqueidentifier', { primary: true, name: 'Id' })
  id: string;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @Column('nvarchar', { name: 'Username', nullable: true, length: 100 })
  username: string | null;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 255 })
  email: string | null;

  @Column('nvarchar', { name: 'IpAddress', length: 50 })
  ipAddress: string;

  @Column('nvarchar', { name: 'UserAgent', length: 500 })
  userAgent: string;

  @Column('bit', { name: 'IsSuccessful' })
  isSuccessful: boolean;

  @Column('nvarchar', { name: 'FailureReason', nullable: true, length: 500 })
  failureReason: string | null;

  @Column('datetime2', {
    name: 'AttemptedAt',
    default: () => 'sysutcdatetime()',
  })
  attemptedAt: Date;

  @ManyToOne(() => Users, (users) => users.loginAuditLogs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'userId' }])
  user: Users;
}
