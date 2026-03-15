import { AxiosRequestConfig } from "axios";
import { TaskDTO, TaskRequestDTO } from "../models/task";
import { requestBackend } from "../utils/request";

export async function insert(taskRequest: TaskRequestDTO): Promise<TaskDTO> {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/tasks",
        data: taskRequest
    }

    return (await requestBackend(config)).data;
}

export async function findAllByProcess(processId: string): Promise<TaskDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `tasks?processId=${processId}`
    }

    return (await requestBackend(config)).data;
}

export async function update(id: string, task: TaskRequestDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/tasks/${id}`,
        data: task
    }

    await requestBackend(config)
}