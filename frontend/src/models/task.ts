export type TaskDTO = {
    id: string,
    title: string,
    description: string,
    status: string,
    createMoment: string;
    dueDate: string;
}

export type TaskRequestDTO = {
    title: string;
    description: string;
    status?: string;
    dueDate: string;
    processId: string
}

export enum ProcessStatus {
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDA = "CONCLUIDA"
}