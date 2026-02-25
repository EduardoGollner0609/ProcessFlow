import { AxiosRequestConfig } from "axios";
import { TaskRequestDTO } from "../models/task";
import { requestBackend } from "../utils/request";

export async function insert(taskRequest: TaskRequestDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/tasks",
        data: taskRequest
    }

    return (await requestBackend(config)).data;
}

export async function findAllByProcess(processId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `tasks?processId=${processId}`
    }

    return (await requestBackend(config)).data;
}