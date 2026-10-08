import { Repository } from 'typeorm';
import { ControlTypes } from '../../entities/ControlTypes';
import { DataTypes } from '../../entities/DataTypes';
import { LookupTypes } from '../../entities/LookupTypes';
import { LookupValues } from '../../entities/LookupValues';
import { Frequencies } from '../../entities/Frequencies';
import { FrequencyPeriodsQueryDto } from '../../common/dto/frequency-periods-query.dto';
import { ExpectedPeriod, FrequencySummary } from '../../common/frequency/frequency-periods';
export interface FrequencyLookupResponse extends FrequencySummary {
    isActive: boolean;
    createdAt: Date;
}
export interface FrequencyPeriodsResponse {
    frequency: FrequencySummary;
    expectedPeriods: ExpectedPeriod[];
}
export declare class LookupsService {
    private readonly controlTypesRepo;
    private readonly dataTypesRepo;
    private readonly lookupTypesRepo;
    private readonly lookupValuesRepo;
    private readonly frequenciesRepo;
    constructor(controlTypesRepo: Repository<ControlTypes>, dataTypesRepo: Repository<DataTypes>, lookupTypesRepo: Repository<LookupTypes>, lookupValuesRepo: Repository<LookupValues>, frequenciesRepo: Repository<Frequencies>);
    findControlTypes(): Promise<ControlTypes[]>;
    findDataTypes(): Promise<DataTypes[]>;
    findLookupTypes(): Promise<LookupTypes[]>;
    findLookupValues(lookupTypeId: number): Promise<LookupValues[]>;
    findFrequencies(): Promise<FrequencyLookupResponse[]>;
    findFrequencyPeriods(frequencyId: number, query: FrequencyPeriodsQueryDto): Promise<FrequencyPeriodsResponse>;
    private toFrequencyLookup;
    private toFrequencySummary;
}
