import { AxiosRequestConfig } from "axios";
import { ClientMinDTO, ClientRequestDTO } from "../models/client";
import { Paged } from "../models/generics";
import { requestBackend } from "../utils/request";

export async function findAllPaged(
    page: number,
    name: string,
    size = 8
): Promise<Paged<ClientMinDTO[]>> {
    const config: AxiosRequestConfig = {
        url: "/clients",
        method: "GET",
        params: { page, name, size }
    }
    console.log((await requestBackend(config)).data);
    return (await requestBackend(config)).data;
}

export async function insert(
    data: ClientRequestDTO
): Promise<ClientMinDTO> {
    const config: AxiosRequestConfig = {
        url: "/clients",
        method: "POST",
        data: data
    }

    return (await requestBackend(config)).data;
}

export async function deleteClient(id: string): Promise<void> {
    const config: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: "DELETE"
    }

    await requestBackend(config)
}

export async function update(id: string, client: ClientRequestDTO): Promise<void> {
    const config: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: "PUT",
        data: client
    }

    await requestBackend(config)
}