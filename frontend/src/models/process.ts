import { ClientMinDTO } from "./client";

export interface ProcessMinDTO {
  id: string;
  title: string;
  description: string;
  status: ProcessStatus;
  createMoment: string; // ISO string
  dueDate: string;      // ISO string
  client: ClientMinDTO;
}

export enum ProcessStatus {
  EM_ESPERA = "EM_ESPERA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CANCELADO = "CANCELADO",
  CONCLUIDO = "CONCLUIDO",
}