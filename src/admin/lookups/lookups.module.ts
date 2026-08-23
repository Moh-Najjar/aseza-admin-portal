import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupsController } from './lookups.controller';
import { LookupsService } from './lookups.service';
import { ControlTypes } from '../../entities/ControlTypes';
import { DataTypes } from '../../entities/DataTypes';
import { LookupTypes } from '../../entities/LookupTypes';
import { LookupValues } from '../../entities/LookupValues';
import { Frequencies } from '../../entities/Frequencies';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ControlTypes,
      DataTypes,
      LookupTypes,
      LookupValues,
      Frequencies,
    ]),
  ],
  controllers: [LookupsController],
  providers: [LookupsService],
})
export class LookupsModule {}
