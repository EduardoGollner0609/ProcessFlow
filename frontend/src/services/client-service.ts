import { AxiosRequestConfig } from "axios";
import { ClientMinDTO } from "../models/client";
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

    return (await requestBackend(config)).data;
}