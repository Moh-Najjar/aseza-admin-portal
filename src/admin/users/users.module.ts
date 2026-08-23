import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../../entities/Users';
import { Roles } from '../../entities/Roles';
import { UserRoles } from '../../entities/UserRoles';

@Module({
  imports: [
    // Register all repositories used by UsersService
    TypeOrmModule.forFeature([Users, Roles, UserRoles]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
