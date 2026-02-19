import { AxiosRequestConfig } from "axios";
import { Paged } from "../models/generics";
import { ProcessMinDTO } from "../models/process";
import { requestBackend } from "../utils/request";

export async function findAllByTitle(
    page: number,
    title: string,
    size = 8
): Promise<Paged<ProcessMinDTO[]>> {
    const config: AxiosRequestConfig = {
        url: "/processes",
        method: "GET",
        params: { page, title, size }
    }

    return (await requestBackend(config)).data;
}