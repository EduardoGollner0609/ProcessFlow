import axios from "axios";
import { BASE_URL } from "../utils/system";
import { ClientsPaged } from "../models/client";

export async function findAllPaged(
    page: number,
    name: string,
    size = 8
): Promise<ClientsPaged> {
const response = await axios.get<ClientsPaged>(`${BASE_URL}/clients`, {
  params: { page, size, name },
});
    return response?.data;
}