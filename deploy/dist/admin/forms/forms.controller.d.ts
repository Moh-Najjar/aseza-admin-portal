import { FormsService, FormDetailResponse } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';
import { Forms } from '../../entities/Forms';
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    getAllForms(): Promise<Forms[]>;
    getForm(formId: number): Promise<FormDetailResponse>;
    createForm(dto: CreateFormDto, admin: AuthenticatedUser): Promise<Forms>;
    updateForm(formId: number, dto: UpdateFormDto, admin: AuthenticatedUser): Promise<Forms>;
    deactivateForm(formId: number): Promise<Forms>;
}
