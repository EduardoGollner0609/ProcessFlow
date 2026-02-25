import {  AxiosRequestConfig } from "axios";
import { Paged } from "../models/generics";
import { ProcessDTO, ProcessMinDTO, ProcessRequestDTO } from "../models/process";
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

export async function findById(id: string): Promise<ProcessDTO> {
    const config: AxiosRequestConfig = {
        url: `/processes/${id}`,
        method: "GET"
    }

    return (await requestBackend(config)).data;
}

export async function insert(process: ProcessRequestDTO) {
    const config: AxiosRequestConfig = {
        url: "/processes",
        method: "POST",
        data: process
    }

    return (await requestBackend(config)).data
}

export async function update(id: string, process: ProcessRequestDTO) {
    const config: AxiosRequestConfig = {
        url: `/processes/${id}`,
        method: "PUT",
        data: process
    }

    await requestBackend(config)
}

export async function deleteProcess(id: string) {
    const config: AxiosRequestConfig = {
        url: `/processes/${id}`,
        method: "DELETE"
    }

    await requestBackend(config)
}