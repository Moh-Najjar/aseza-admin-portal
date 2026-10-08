import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormsService, FormDetailResponse } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import { Forms } from '../../entities/Forms';

@ApiTags('Forms')
@ApiBearerAuth()
@Controller('admin/forms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  /**
   * GET /admin/forms/all
   * Returns all forms (active + inactive) for admin management.
   * Note: GET /admin/forms (active only) is already served by DirectoratesController.
   */
  @ApiOperation({
    summary: 'Returns all forms (active + inactive) for admin management.',
    description: 'For active forms only, use GET /admin/forms.',
  })
  @Get('all')
  getAllForms(): Promise<Forms[]> {
    return this.formsService.findAll();
  }

  /**
   * GET /admin/forms/:formId
   * Returns a single form with ALL its fields and every field's sub-relations.
   */
  @ApiOperation({
    summary:
      "Returns a single form with all its fields and every field's sub-relations.",
  })
  @Get(':formId')
  getForm(
    @Param('formId', ParseIntPipe) formId: number,
  ): Promise<FormDetailResponse> {
    return this.formsService.findOne(formId);
  }

  /**
   * POST /admin/forms
   * Creates a new blank form (no fields, no directorate assignment).
   */
  @ApiOperation({
    summary: 'Creates a new blank form (no fields, no directorate assignment).',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createForm(
    @Body() dto: CreateFormDto,
    @CurrentUser() admin: AuthenticatedUser,
  ): Promise<Forms> {
    return this.formsService.create(dto, admin);
  }

  /**
   * PATCH /admin/forms/:formId
   * Partially updates form metadata (name, description, directorate, etc.).
   */
  @ApiOperation({
    summary:
      'Partially updates form metadata (name, description, directorate, etc.).',
    description: 'Only provided fields are changed.',
  })
  @Patch(':formId')
  updateForm(
    @Param('formId', ParseIntPipe) formId: number,
    @Body() dto: UpdateFormDto,
    @CurrentUser() admin: AuthenticatedUser,
  ): Promise<Forms> {
    return this.formsService.update(formId, dto, admin);
  }

  /**
   * DELETE /admin/forms/:formId
   * Soft-deletes the form (sets IsActive = false).
   */
  @ApiOperation({
    summary: 'Soft-deletes the form (sets IsActive = false).',
  })
  @Delete(':formId')
  @HttpCode(HttpStatus.OK)
  deactivateForm(
    @Param('formId', ParseIntPipe) formId: number,
  ): Promise<Forms> {
    return this.formsService.deactivate(formId);
  }
}
