import axios from "axios";
import { BASE_URL } from "../utils/system";

export async function findAllPaged(
    page: number,
    name: string,
    size = 2
) {
    const response = await axios.get(`${BASE_URL}/clients?page=${page}&size=${size}`);
    return response.data;
}