import axios from "axios";
import { BASE_URL } from "../utils/system";
import { Paged } from "../models/generics";
import { ProcessMinDTO } from "../models/process";

export async function findAllByTitle(page: number, title: string, size = 8): Promise<Paged<ProcessMinDTO[]>> {
    const response = await axios.get<Paged<ProcessMinDTO[]>>(`${BASE_URL}/processes`, {
        params: { page, title, size }
    })

    return response?.data;
}