import { Usuario } from '../core/models/usuario.model';

export interface Post {
  id?: string;
  donoPost: Usuario;
  tipoPost?: tipoRealizacaoPost;
  comentarios?: comentarioPost[];
  descricao: string;
  dataPost: string;
  usuariosMarcados?: Usuario[];
  imagensAnexadas?: string;
  evento?: Evento;
  postRh?: boolean;
}

export interface Evento {
  dataInicioEvento: string;
  dataFimEvento: string;
  horarioInicio: string;
  horarioFim: string;
  nomeEvento: string;
  participantes?: Usuario[];
  linkTransmissaoEvento: string;
  linkInscricaoEvento: string;
}

export interface OnlineSystemPost extends Post {
  imagemCarregada?: string;
}

export enum tipoRealizacaoPost {
  judicial = 'Judicial',
  academica = 'Acadêmica',
  consultiva = 'Consultiva de Projeto',
}

export interface comentarioPost {
  donoComentario: Usuario;
  comentario: string;
  dataComentario: string;
}
