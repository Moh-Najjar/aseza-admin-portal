import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directorates } from '../../entities/Directorates';
import { Forms } from '../../entities/Forms';
import { DirectorateFormAccess } from '../../entities/DirectorateFormAccess';
import { AssignFormDto } from './dto/assign-form.dto';

@Injectable()
export class DirectoratesService {
  constructor(
    @InjectRepository(Directorates)
    private readonly directoratesRepo: Repository<Directorates>,

    @InjectRepository(Forms)
    private readonly formsRepo: Repository<Forms>,

    @InjectRepository(DirectorateFormAccess)
    private readonly accessRepo: Repository<DirectorateFormAccess>,
  ) {}

  /**
   * GET /admin/directorates
   * Returns all directorates ordered by ID.
   * The parent relation is included so the client can build a tree if needed.
   */
  async findAll(): Promise<Directorates[]> {
    // The actual Directorates table has no parent FK — flat list only
    return this.directoratesRepo.find({
      order: { directorateId: 'ASC' },
    });
  }

  /**
   * GET /admin/directorates/:id/forms
   * Returns all form access records for a directorate, including the form details.
   */
  async getFormAccesses(
    directorateId: number,
  ): Promise<DirectorateFormAccess[]> {
    await this.assertDirectorateExists(directorateId);

    return this.accessRepo.find({
      where: { directorateId },
      relations: { form: true },
      order: { accessId: 'ASC' },
    });
  }

  /**
   * POST /admin/directorates/:id/forms
   * Creates a new form access record, or updates the permission flags if one
   * already exists for this (directorate, form) pair (upsert behaviour).
   */
  async assignForm(
    directorateId: number,
    dto: AssignFormDto,
  ): Promise<DirectorateFormAccess> {
    await this.assertDirectorateExists(directorateId);
    await this.assertFormExists(dto.formId);

    // Try to find an existing record to update (upsert)
    const existing = await this.accessRepo.findOne({
      where: { directorateId, formId: dto.formId },
    });

    if (existing) {
      // Update the permission flags in-place
      existing.canView = dto.canView;
      existing.canSubmit = dto.canSubmit;
      existing.canApprove = dto.canApprove;
      return this.accessRepo.save(existing);
    }

    // Create a new access record
    const newAccess = this.accessRepo.create({
      directorateId,
      formId: dto.formId,
      canView: dto.canView,
      canSubmit: dto.canSubmit,
      canApprove: dto.canApprove,
    });

    return this.accessRepo.save(newAccess);
  }

  /**
   * DELETE /admin/directorates/:id/forms/:formId
   * Removes form access from a directorate.
   */
  async removeFormAccess(directorateId: number, formId: number): Promise<void> {
    await this.assertDirectorateExists(directorateId);

    const access = await this.accessRepo.findOne({
      where: { directorateId, formId },
    });

    if (!access) {
      throw new NotFoundException(
        `Form ${formId} is not assigned to directorate ${directorateId}`,
      );
    }

    await this.accessRepo.remove(access);
  }

  /**
   * GET /admin/forms
   * Returns all active forms — used for dropdowns in the admin UI.
   */
  async findAllActiveForms(): Promise<Forms[]> {
    return this.formsRepo.find({
      where: { isActive: true },
      order: { formId: 'ASC' },
    });
  }

  // ---------- private helpers ----------

  private async assertDirectorateExists(directorateId: number): Promise<void> {
    const exists = await this.directoratesRepo.existsBy({ directorateId });
    if (!exists) {
      throw new NotFoundException(
        `Directorate with id ${directorateId} not found`,
      );
    }
  }

  private async assertFormExists(formId: number): Promise<void> {
    const exists = await this.formsRepo.existsBy({ formId });
    if (!exists) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }
  }
}
