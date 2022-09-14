import { Timestamp } from "firebase/firestore";

export interface Job {
  empresa: string;
  setor: string;
  cargo: string;
  descricao: string;
  dataInicio: Timestamp;
  dataFim?: Timestamp;
}