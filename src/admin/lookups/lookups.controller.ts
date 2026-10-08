import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LookupsService } from './lookups.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { FrequencyPeriodsQueryDto } from '../../common/dto/frequency-periods-query.dto';

/** Read-only metadata endpoints used to populate form-builder dropdowns */
@ApiTags('Lookups')
@ApiBearerAuth()
@Controller('admin/lookups')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class LookupsController {
  constructor(private readonly lookupsService: LookupsService) {}

  /** GET /admin/lookups/control-types — e.g. TEXTBOX, DROPDOWN, TABLE, CALCULATED */
  @ApiOperation({
    summary:
      'Returns all control types, e.g. TEXTBOX, DROPDOWN, TABLE, CALCULATED.',
  })
  @Get('control-types')
  getControlTypes() {
    return this.lookupsService.findControlTypes();
  }

  /** GET /admin/lookups/data-types — e.g. TEXT, NUMBER, DATE, BOOLEAN */
  @ApiOperation({
    summary: 'Returns all data types, e.g. TEXT, NUMBER, DATE, BOOLEAN.',
  })
  @Get('data-types')
  getDataTypes() {
    return this.lookupsService.findDataTypes();
  }

  /** GET /admin/lookups/lookup-types — categories of lookup lists */
  @ApiOperation({
    summary:
      'Returns all lookup types — the categories of lists used by DROPDOWN / RADIO fields.',
  })
  @Get('lookup-types')
  getLookupTypes() {
    return this.lookupsService.findLookupTypes();
  }

  /** GET /admin/lookups/lookup-types/:lookupTypeId/values — values within a lookup */
  @ApiOperation({
    summary: 'Returns the values within a single lookup type.',
  })
  @Get('lookup-types/:lookupTypeId/values')
  getLookupValues(@Param('lookupTypeId', ParseIntPipe) lookupTypeId: number) {
    return this.lookupsService.findLookupValues(lookupTypeId);
  }

  /** GET /admin/lookups/frequencies — e.g. DAILY, WEEKLY, MONTHLY */
  @ApiOperation({
    summary:
      'Returns all frequencies, e.g. DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY.',
  })
  @Get('frequencies')
  getFrequencies() {
    return this.lookupsService.findFrequencies();
  }

  /**
   * GET /admin/lookups/frequencies/:frequencyId/periods
   * Preview calendar windows for a frequency before assigning it to a field.
   */
  @ApiOperation({
    summary:
      'Previews calendar windows for a frequency before assigning it to a field.',
  })
  @Get('frequencies/:frequencyId/periods')
  getFrequencyPeriods(
    @Param('frequencyId', ParseIntPipe) frequencyId: number,
    @Query() query: FrequencyPeriodsQueryDto,
  ) {
    return this.lookupsService.findFrequencyPeriods(frequencyId, query);
  }
}
