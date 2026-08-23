import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LookupsService } from './lookups.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

/** Read-only metadata endpoints used to populate form-builder dropdowns */
@Controller('admin/lookups')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class LookupsController {
  constructor(private readonly lookupsService: LookupsService) {}

  /** GET /admin/lookups/control-types — e.g. TEXTBOX, DROPDOWN, TABLE, CALCULATED */
  @Get('control-types')
  getControlTypes() {
    return this.lookupsService.findControlTypes();
  }

  /** GET /admin/lookups/data-types — e.g. TEXT, NUMBER, DATE, BOOLEAN */
  @Get('data-types')
  getDataTypes() {
    return this.lookupsService.findDataTypes();
  }

  /** GET /admin/lookups/lookup-types — categories of lookup lists */
  @Get('lookup-types')
  getLookupTypes() {
    return this.lookupsService.findLookupTypes();
  }

  /** GET /admin/lookups/lookup-types/:lookupTypeId/values — values within a lookup */
  @Get('lookup-types/:lookupTypeId/values')
  getLookupValues(@Param('lookupTypeId', ParseIntPipe) lookupTypeId: number) {
    return this.lookupsService.findLookupValues(lookupTypeId);
  }

  /** GET /admin/lookups/frequencies — e.g. DAILY, WEEKLY, MONTHLY */
  @Get('frequencies')
  getFrequencies() {
    return this.lookupsService.findFrequencies();
  }
}
