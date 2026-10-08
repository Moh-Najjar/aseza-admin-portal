import { FormSubmissions } from './FormSubmissions';
import { Forms } from './Forms';
import { Users } from './Users';
export declare class FormVersions {
    formVersionId: number;
    formId: number;
    version: number;
    schemaSnapshotJson: string;
    changeNotes: string | null;
    createdAt: Date;
    formSubmissions: FormSubmissions[];
    form: Forms;
    createdBy: Users;
}
