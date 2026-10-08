import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DirectoratesService } from './directorates.service';
import { AssignFormDto } from './dto/assign-form.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Directorates } from '../../entities/Directorates';
import { Forms } from '../../entities/Forms';
import { DirectorateFormAccess } from '../../entities/DirectorateFormAccess';

/** All routes in this controller require a valid ADMIN JWT */
@ApiTags('Directorates')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class DirectoratesController {
  constructor(private readonly directoratesService: DirectoratesService) {}

  /**
   * GET /admin/directorates
   * Returns all directorates with their parent info.
   */
  @ApiOperation({
    summary: 'Returns all directorates with their parent info.',
  })
  @Get('directorates')
  getAllDirectorates(): Promise<Directorates[]> {
    return this.directoratesService.findAll();
  }

  /**
   * GET /admin/directorates/:id/forms
   * Lists all form access records assigned to a specific directorate.
   */
  @ApiOperation({
    summary:
      'Lists all form access records assigned to a specific directorate.',
  })
  @Get('directorates/:id/forms')
  getDirectorateForms(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DirectorateFormAccess[]> {
    return this.directoratesService.getFormAccesses(id);
  }

  /**
   * POST /admin/directorates/:id/forms
   * Assigns a form to a directorate with specified permissions.
   * If the form is already assigned, updates the permission flags (upsert).
   */
  @ApiOperation({
    summary:
      'Assigns a form to a directorate with view/submit/approve permissions.',
    description:
      'If the form is already assigned, updates the permission flags.',
  })
  @Post('directorates/:id/forms')
  @HttpCode(HttpStatus.OK)
  assignForm(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignFormDto,
  ): Promise<DirectorateFormAccess> {
    return this.directoratesService.assignForm(id, dto);
  }

  /**
   * DELETE /admin/directorates/:id/forms/:formId
   * Removes a form access record from a directorate.
   */
  @ApiOperation({
    summary: 'Removes a form access record from a directorate.',
  })
  @Delete('directorates/:id/forms/:formId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFormAccess(
    @Param('id', ParseIntPipe) id: number,
    @Param('formId', ParseIntPipe) formId: number,
  ): Promise<void> {
    return this.directoratesService.removeFormAccess(id, formId);
  }

  /**
   * GET /admin/forms
   * Returns all active forms — used to populate form dropdowns in the admin UI.
   */
  @ApiOperation({
    summary:
      'Returns all active forms — used to populate form dropdowns in the admin UI.',
  })
  @Get('forms')
  getAllForms(): Promise<Forms[]> {
    return this.directoratesService.findAllActiveForms();
  }
}
