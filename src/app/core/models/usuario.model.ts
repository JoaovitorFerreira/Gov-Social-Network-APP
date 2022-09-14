import { Especialidades } from "./especialidades.model";
import { Formacao } from "./formacao.model";
import { Job } from "./job.model";

export interface Usuario {
    id: string;
    username: string;
    firstAccess: boolean;
    especialidades: Especialidades;
    profilePicture: string;
    currentJob: Job;
    jobs: Job[];
    formacao: Formacao[];
}