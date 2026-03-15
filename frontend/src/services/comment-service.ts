import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import { CommentDTO, CommentRequestDTO } from "../models/comment";

export async function insert(comment: CommentRequestDTO): Promise<CommentDTO> {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/comments",
        data: comment
    }

    return (await requestBackend(config)).data;
}

export async function findAllByProcess(processId: string): Promise<CommentDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `comments?processId=${processId}`
    }

    return (await requestBackend(config)).data;
}

export async function deleteComment(id: string) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `comments/${id}`
    }

    await requestBackend(config)
}