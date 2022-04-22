import { Especialidades } from "./especialidades.model";

export interface Usuario {
    username: string;
    firstAccess: boolean;
    especialidades: Especialidades;
}