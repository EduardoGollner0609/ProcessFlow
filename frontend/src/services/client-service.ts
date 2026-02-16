import axios from "axios";
import { BASE_URL } from "../utils/system";
import { ClientMinDTO } from "../models/client";
import { Paged } from "../models/generics";

export async function findAllPaged(
    page: number,
    name: string,
    size = 8
): Promise<Paged<ClientMinDTO[]>> {
    const response = await axios.get<Paged<ClientMinDTO[]>>(`${BASE_URL}/clients`, {
        params: { page, size, name },
    });

    return response?.data;
}