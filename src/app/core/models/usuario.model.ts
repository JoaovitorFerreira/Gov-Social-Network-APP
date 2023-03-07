import { Especialidades } from "./especialidades.model";
import { Formacao } from "./formacao.model";
import { Hobbies } from "./hobbies.model";
import { IdealLocation } from "./idealLocation.model";
import { Idiomas } from "./idiomas.models";
import { Job } from "./job.model";

export interface Usuario {
    id: string;
    username: string;
    firstAccess: boolean;
    especialidades: Especialidades;
    hobbies: Hobbies;
    profilePicture: string;
    currentJob: Job;
    jobs: Job[];
    formacao: Formacao[];
    genero: string;
    idiomas: Idiomas;
    idealLocations: IdealLocation;
    funcionarioRh: boolean;
}