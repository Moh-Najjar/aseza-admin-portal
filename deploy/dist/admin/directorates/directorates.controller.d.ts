import { DirectoratesService } from './directorates.service';
import { AssignFormDto } from './dto/assign-form.dto';
import { Directorates } from '../../entities/Directorates';
import { Forms } from '../../entities/Forms';
import { DirectorateFormAccess } from '../../entities/DirectorateFormAccess';
export declare class DirectoratesController {
    private readonly directoratesService;
    constructor(directoratesService: DirectoratesService);
    getAllDirectorates(): Promise<Directorates[]>;
    getDirectorateForms(id: number): Promise<DirectorateFormAccess[]>;
    assignForm(id: number, dto: AssignFormDto): Promise<DirectorateFormAccess>;
    removeFormAccess(id: number, formId: number): Promise<void>;
    getAllForms(): Promise<Forms[]>;
}
