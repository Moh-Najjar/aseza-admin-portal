import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './admin/users/users.module';
import { DirectoratesModule } from './admin/directorates/directorates.module';
import { FormsManagementModule } from './admin/forms/forms.module';
import { LookupsModule } from './admin/lookups/lookups.module';
import { buildDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    // Load .env into process.env before anything else resolves
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere without re-importing
      envFilePath: '.env',
    }),

    // TypeORM connection to Azure SQL Server — config is read from process.env
    TypeOrmModule.forRootAsync({
      useFactory: buildDatabaseConfig,
    }),

    // Auth (login / logout / JWT strategy / Redis blacklist)
    AuthModule,

    // Admin — users, roles, directorates, forms
    UsersModule,
    DirectoratesModule,
    FormsManagementModule,
    LookupsModule,
  ],
})
export class AppModule {}
