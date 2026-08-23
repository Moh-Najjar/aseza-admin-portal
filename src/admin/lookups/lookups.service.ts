import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlTypes } from '../../entities/ControlTypes';
import { DataTypes } from '../../entities/DataTypes';
import { LookupTypes } from '../../entities/LookupTypes';
import { LookupValues } from '../../entities/LookupValues';
import { Frequencies } from '../../entities/Frequencies';

/** Read-only lookup data used to populate dropdowns in the form builder UI */
@Injectable()
export class LookupsService {
  constructor(
    @InjectRepository(ControlTypes)
    private readonly controlTypesRepo: Repository<ControlTypes>,

    @InjectRepository(DataTypes)
    private readonly dataTypesRepo: Repository<DataTypes>,

    @InjectRepository(LookupTypes)
    private readonly lookupTypesRepo: Repository<LookupTypes>,

    @InjectRepository(LookupValues)
    private readonly lookupValuesRepo: Repository<LookupValues>,

    @InjectRepository(Frequencies)
    private readonly frequenciesRepo: Repository<Frequencies>,
  ) {}

  /** All active control types (e.g. TEXTBOX, DROPDOWN, TABLE, CALCULATED) */
  findControlTypes(): Promise<ControlTypes[]> {
    return this.controlTypesRepo.find({
      where: { isActive: true },
      order: { controlTypeId: 'ASC' },
    });
  }

  /** All active data types (e.g. TEXT, NUMBER, DATE, BOOLEAN) */
  findDataTypes(): Promise<DataTypes[]> {
    return this.dataTypesRepo.find({
      where: { isActive: true },
      order: { dataTypeId: 'ASC' },
    });
  }

  /** All active lookup type categories — used to assign a lookup source to a field */
  findLookupTypes(): Promise<LookupTypes[]> {
    return this.lookupTypesRepo.find({
      where: { isActive: true },
      order: { lookupTypeId: 'ASC' },
    });
  }

  /** Values for a specific lookup type — used when building dropdown options from a lookup */
  findLookupValues(lookupTypeId: number): Promise<LookupValues[]> {
    return this.lookupValuesRepo.find({
      where: { lookupType: { lookupTypeId }, isActive: true },
      order: { lookupValueId: 'ASC' },
    });
  }

  /** All active frequencies (e.g. DAILY, WEEKLY, MONTHLY) */
  findFrequencies(): Promise<Frequencies[]> {
    return this.frequenciesRepo.find({
      where: { isActive: true },
      order: { frequencyId: 'ASC' },
    });
  }
}
