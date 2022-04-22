import { Especialidades } from "./especialidades.model";

export interface Usuario {
    username: string;
    telefone: string;
    locacao: string;
    firstAccess: boolean;
    especialidades: Especialidades;
}