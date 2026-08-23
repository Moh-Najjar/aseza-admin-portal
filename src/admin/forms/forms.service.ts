import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forms } from '../../entities/Forms';
import { FormFields } from '../../entities/FormFields';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import {
  FIELD_RESPONSE_RELATIONS,
  FormFieldResponse,
  mapFormFieldToResponse,
} from './mappers/form-field.mapper';

/** Form detail returned by GET /admin/forms/:formId — fields include projected isActive */
export interface FormDetailResponse extends Omit<Forms, 'formFields'> {
  formFields: FormFieldResponse[];
}

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Forms)
    private readonly formsRepo: Repository<Forms>,

    @InjectRepository(FormFields)
    private readonly fieldsRepo: Repository<FormFields>,
  ) { }

  /**
   * POST /admin/forms
   * Creates a new form. The form starts unassigned to any directorate or user.
   */
  async create(dto: CreateFormDto, admin: AuthenticatedUser): Promise<Forms> {
    // Ensure formKey uniqueness before attempting insert
    const duplicate = await this.formsRepo.findOne({
      where: { formKey: dto.formKey },
    });

    if (duplicate) {
      throw new ConflictException(
        `A form with formKey "${dto.formKey}" already exists`,
      );
    }

    const form = this.formsRepo.create({
      formKey: dto.formKey,
      nameEn: dto.nameEn,
      nameAr: dto.nameAr,
      descriptionEn: dto.descriptionEn ?? null,
      descriptionAr: dto.descriptionAr ?? null,
      isActive: dto.isActive ?? true,
      directorateId: dto.directorateId ?? null,
      frequencyId: dto.frequencyId ?? null,
      // Store the raw date strings — TypeORM maps them to the 'date' column type
      effectiveFrom: dto.effectiveFrom ? new Date(dto.effectiveFrom) : null,
      effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : null,
      createdByUserId: admin.userId > 0 ? admin.userId : null,
    });

    return this.formsRepo.save(form);
  }

  /**
   * GET /admin/forms/:formId
   * Returns the form with all its fields and field sub-relations.
   */
  async findOne(formId: number): Promise<FormDetailResponse> {
    const form = await this.formsRepo.findOne({
      where: { formId },
      relations: {
        directorate: true,
        frequency: true,
        formFields: FIELD_RESPONSE_RELATIONS,
      },
    });

    if (!form) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }

    return {
      ...form,
      formFields: form.formFields.map(mapFormFieldToResponse),
    };
  }

  /**
   * GET /admin/forms
   * Already handled by DirectoratesController (active forms only).
   * This overload returns ALL forms (active and inactive) for the admin view.
   */
  async findAll(): Promise<Forms[]> {
    return this.formsRepo.find({
      relations: { directorate: true, frequency: true },
      order: { formId: 'ASC' },
    });
  }

  /**
   * PATCH /admin/forms/:formId
   * Applies partial updates. Only provided fields are changed.
   */
  async update(
    formId: number,
    dto: UpdateFormDto,
    admin: AuthenticatedUser,
  ): Promise<Forms> {
    const form = await this.formsRepo.findOne({ where: { formId } });

    if (!form) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }

    // Apply only the fields that were sent in the request
    if (dto.nameEn !== undefined) form.nameEn = dto.nameEn;
    if (dto.nameAr !== undefined) form.nameAr = dto.nameAr;
    if (dto.descriptionEn !== undefined) form.descriptionEn = dto.descriptionEn;
    if (dto.descriptionAr !== undefined) form.descriptionAr = dto.descriptionAr;
    if (dto.isActive !== undefined) form.isActive = dto.isActive;
    if (dto.directorateId !== undefined) form.directorateId = dto.directorateId;
    if (dto.frequencyId !== undefined) form.frequencyId = dto.frequencyId;
    if (dto.effectiveFrom !== undefined) {
      form.effectiveFrom = dto.effectiveFrom
        ? new Date(dto.effectiveFrom)
        : null;
    }
    if (dto.effectiveTo !== undefined) {
      form.effectiveTo = dto.effectiveTo ? new Date(dto.effectiveTo) : null;
    }

    form.updatedAt = new Date();
    form.updatedByUserId = admin.userId > 0 ? admin.userId : null;

    return this.formsRepo.save(form);
  }

  /**
   * DELETE /admin/forms/:formId
   * Soft-deletes the form by setting IsActive = false.
   * Hard-deleting is not exposed to protect referential integrity.
   */
  async deactivate(formId: number): Promise<Forms> {
    const form = await this.formsRepo.findOne({ where: { formId } });

    if (!form) {
      throw new NotFoundException(`Form with id ${formId} not found`);
    }

    form.isActive = false;
    return this.formsRepo.save(form);
  }
}
