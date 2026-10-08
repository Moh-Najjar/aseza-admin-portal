import { Repository } from 'typeorm';
import { Directorates } from '../../entities/Directorates';
import { Forms } from '../../entities/Forms';
import { DirectorateFormAccess } from '../../entities/DirectorateFormAccess';
import { AssignFormDto } from './dto/assign-form.dto';
export declare class DirectoratesService {
    private readonly directoratesRepo;
    private readonly formsRepo;
    private readonly accessRepo;
    constructor(directoratesRepo: Repository<Directorates>, formsRepo: Repository<Forms>, accessRepo: Repository<DirectorateFormAccess>);
    findAll(): Promise<Directorates[]>;
    getFormAccesses(directorateId: number): Promise<DirectorateFormAccess[]>;
    assignForm(directorateId: number, dto: AssignFormDto): Promise<DirectorateFormAccess>;
    removeFormAccess(directorateId: number, formId: number): Promise<void>;
    findAllActiveForms(): Promise<Forms[]>;
    private assertDirectorateExists;
    private assertFormExists;
}
