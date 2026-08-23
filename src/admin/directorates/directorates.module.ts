import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoratesController } from './directorates.controller';
import { DirectoratesService } from './directorates.service';
import { Directorates } from '../../entities/Directorates';
import { Forms } from '../../entities/Forms';
import { DirectorateFormAccess } from '../../entities/DirectorateFormAccess';

@Module({
  imports: [
    // Register all repositories used by DirectoratesService
    TypeOrmModule.forFeature([Directorates, Forms, DirectorateFormAccess]),
  ],
  controllers: [DirectoratesController],
  providers: [DirectoratesService],
})
export class DirectoratesModule {}
