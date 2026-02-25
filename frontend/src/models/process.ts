import { ClientMinDTO } from "./client";
import { CommentDTO } from "./comment";
import { TaskDTO } from "./task";

export interface ProcessMinDTO {
  id: string;
  title: string;
  description: string;
  status: ProcessStatus;
  createMoment: string;
  dueDate: string;
  client: ClientMinDTO;
}

export type ProcessRequestDTO = {
  title: string;
  description: string;
  dueDate: string;
  clientId: string;
};

export type ProcessDTO = {
  id: string;
  title: string;
  description: string;
  status: ProcessStatus;
  createMoment: string;
  dueDate: string;
  client: ClientMinDTO;
  comments: CommentDTO[];
  tasks: TaskDTO[];
  filesUrl: string[]

}

export enum ProcessStatus {
  EM_ESPERA = "EM_ESPERA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CANCELADO = "CANCELADO",
  CONCLUIDO = "CONCLUIDO",
}