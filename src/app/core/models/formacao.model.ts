export interface Formacao {
  tipo: TipoFormacao;
  instituicao: string;
  curso: string;
  descricao: string;
  dataInicio: string;
  dataFim?: string;
}

export type TipoFormacao =
  | 'Graduação'
  | 'Pós-Graduação'
  | 'Especialização'
  | 'Mestrado'
  | 'Doutorado'
  | 'Curso'
  | 'Certificado'
  | 'Palestra'
  | 'Workshop';
