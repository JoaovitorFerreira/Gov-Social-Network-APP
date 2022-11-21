import { InterestReaction } from "./interestReaction";
import { Timestamp } from "firebase/firestore";
import { Usuario } from "../core/models/usuario.model";

export interface Post {
  id:string;
  donoPost: Usuario;
  tipoPost: tipoRealizacaoPost;
  comentarios?: comentarioPost[];
  descricao: string;
  dataPost: Timestamp;
  usuariosMarcados?: string[];
  imagensAnexadas?: string;
  reacoes?: InterestReaction[];
}

export interface OnlineSystemPost extends Post {
  imagemCarregada
}

export enum tipoRealizacaoPost {
judicial = 'Judicial',
academica = 'Acadêmica',
consultiva = 'Consultiva de Projeto',
}

export interface comentarioPost {
    donoComentario: string;
    comentario: string;
    dataComentario: Timestamp;
}