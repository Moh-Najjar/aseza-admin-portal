import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('IX_UserSessions_RefreshToken', ['refreshToken'], {})
@Index('IX_UserSessions_UserId', ['userId'], {})
@Index('IX_UserSessions_UserId_IsActive', ['userId', 'isActive'], {})
@Index('PK__UserSess__3214EC0799F58D22', ['id'], { unique: true })
@Entity('UserSessions', { schema: 'dbo' })
export class UserSessions {
  @Column('uniqueidentifier', { primary: true, name: 'Id' })
  id: string;

  @Column('int', { name: 'UserId' })
  userId: number;

  @Column('nvarchar', { name: 'RefreshToken', length: 500 })
  refreshToken: string;

  @Column('nvarchar', { name: 'IpAddress', length: 50 })
  ipAddress: string;

  @Column('nvarchar', { name: 'UserAgent', length: 500 })
  userAgent: string;

  @Column('datetime2', { name: 'CreatedAt', default: () => 'sysutcdatetime()' })
  createdAt: Date;

  @Column('datetime2', { name: 'LastActivityAt', nullable: true })
  lastActivityAt: Date | null;

  @Column('datetime2', { name: 'ExpiresAt' })
  expiresAt: Date;

  @Column('bit', { name: 'IsActive', default: () => '(1)' })
  isActive: boolean;

  @Column('datetime2', { name: 'RevokedAt', nullable: true })
  revokedAt: Date | null;

  @Column('nvarchar', { name: 'RevokedReason', nullable: true, length: 500 })
  revokedReason: string | null;

  @ManyToOne(() => Users, (users) => users.userSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'userId' }])
  user: Users;
}
