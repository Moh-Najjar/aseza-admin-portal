import { Repository } from 'typeorm';
import { Forms } from '../../entities/Forms';
import { FormFields } from '../../entities/FormFields';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import { FormFieldResponse } from './mappers/form-field.mapper';
export interface FormDetailResponse extends Omit<Forms, 'formFields'> {
    formFields: FormFieldResponse[];
}
export declare class FormsService {
    private readonly formsRepo;
    private readonly fieldsRepo;
    constructor(formsRepo: Repository<Forms>, fieldsRepo: Repository<FormFields>);
    create(dto: CreateFormDto, admin: AuthenticatedUser): Promise<Forms>;
    findOne(formId: number): Promise<FormDetailResponse>;
    findAll(): Promise<Forms[]>;
    update(formId: number, dto: UpdateFormDto, admin: AuthenticatedUser): Promise<Forms>;
    deactivate(formId: number): Promise<Forms>;
}
