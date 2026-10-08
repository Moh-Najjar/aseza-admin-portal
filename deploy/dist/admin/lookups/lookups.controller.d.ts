import { LookupsService } from './lookups.service';
import { FrequencyPeriodsQueryDto } from '../../common/dto/frequency-periods-query.dto';
export declare class LookupsController {
    private readonly lookupsService;
    constructor(lookupsService: LookupsService);
    getControlTypes(): Promise<import("../../entities/ControlTypes").ControlTypes[]>;
    getDataTypes(): Promise<import("../../entities/DataTypes").DataTypes[]>;
    getLookupTypes(): Promise<import("../../entities/LookupTypes").LookupTypes[]>;
    getLookupValues(lookupTypeId: number): Promise<import("../../entities/LookupValues").LookupValues[]>;
    getFrequencies(): Promise<import("./lookups.service").FrequencyLookupResponse[]>;
    getFrequencyPeriods(frequencyId: number, query: FrequencyPeriodsQueryDto): Promise<import("./lookups.service").FrequencyPeriodsResponse>;
}
