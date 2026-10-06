import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlTypes } from '../../entities/ControlTypes';
import { DataTypes } from '../../entities/DataTypes';
import { LookupTypes } from '../../entities/LookupTypes';
import { LookupValues } from '../../entities/LookupValues';
import { Frequencies } from '../../entities/Frequencies';
import { FrequencyPeriodsQueryDto } from '../../common/dto/frequency-periods-query.dto';
import {
  ExpectedPeriod,
  FrequencySummary,
  PeriodAnchor,
  generateExpectedPeriods,
  hasDiscretePeriods,
  parsePeriodStartDate,
  supportsCustomPeriodStart,
} from '../../common/frequency/frequency-periods';

export interface FrequencyLookupResponse extends FrequencySummary {
  isActive: boolean;
  createdAt: Date;
}

export interface FrequencyPeriodsResponse {
  frequency: FrequencySummary;
  expectedPeriods: ExpectedPeriod[];
}

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

  /** All active frequencies (e.g. DAILY, WEEKLY, MONTHLY) plus period-grid flag */
  async findFrequencies(): Promise<FrequencyLookupResponse[]> {
    const rows = await this.frequenciesRepo.find({
      where: { isActive: true },
      order: { frequencyId: 'ASC' },
    });

    return rows.map((row) => this.toFrequencyLookup(row));
  }

  /**
   * Calendar windows for one catalog frequency.
   * ONGOING / ON_DEMAND return an empty expectedPeriods list.
   */
  async findFrequencyPeriods(
    frequencyId: number,
    query: FrequencyPeriodsQueryDto,
  ): Promise<FrequencyPeriodsResponse> {
    const frequency = await this.frequenciesRepo.findOne({
      where: { frequencyId, isActive: true },
    });

    if (!frequency) {
      throw new NotFoundException(`Frequency with id ${frequencyId} not found`);
    }

    const year = query.year ?? new Date().getUTCFullYear();
    let anchor: PeriodAnchor | undefined;

    if (query.periodStartDate !== undefined) {
      const parsed = parsePeriodStartDate(query.periodStartDate);
      if (!parsed) {
        throw new BadRequestException(
          `Invalid periodStartDate "${query.periodStartDate}". Use a real calendar date (YYYY-MM-DD).`,
        );
      }
      if (
        !(parsed.month === 1 && parsed.day === 1) &&
        !supportsCustomPeriodStart(frequency.code)
      ) {
        throw new BadRequestException(
          `Frequency ${frequency.code} does not support a custom period start date`,
        );
      }
      anchor = parsed;
    }

    return {
      frequency: this.toFrequencySummary(frequency),
      expectedPeriods: generateExpectedPeriods(frequency.code, {
        year,
        month: query.month,
        anchor,
      }),
    };
  }

  private toFrequencyLookup(row: Frequencies): FrequencyLookupResponse {
    return {
      ...this.toFrequencySummary(row),
      isActive: row.isActive,
      createdAt: row.createdAt,
    };
  }

  private toFrequencySummary(row: Frequencies): FrequencySummary {
    return {
      frequencyId: row.frequencyId,
      code: row.code,
      nameEn: row.nameEn,
      nameAr: row.nameAr,
      description: row.description,
      hasDiscretePeriods: hasDiscretePeriods(row.code),
      supportsCustomPeriodStart: supportsCustomPeriodStart(row.code),
    };
  }
}
