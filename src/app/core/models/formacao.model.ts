import { Timestamp } from "firebase/firestore";

export interface Formacao {
  tipo: TipoFormacao;
  instituicao: string;
  curso: string;
  descricao: string;
  dataInicio: Timestamp;
  dataFim?: Timestamp;
}

export type TipoFormacao = 'Graduação' | 'Pós-Graduação' | 'Especialização' | 'Mestrado' | 'Doutorado' | 'Curso' | 'Certificado' | 'Palestra' | 'Workshop';