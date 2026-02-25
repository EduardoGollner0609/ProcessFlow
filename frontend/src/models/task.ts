export type TaskDTO = {
    id: string,
    title: string,
    description: string,
    status: string,
    createMoment: string;
    dueDate: string;
}

export enum ProcessStatus {
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDA = "CONCLUIDA"
}