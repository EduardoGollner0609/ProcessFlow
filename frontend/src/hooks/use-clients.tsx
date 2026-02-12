import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as clientService from '../services/client-service';
import { ClientsPaged } from "../models/client";

export default function useClients(page: number, name: string) {
    return useQuery<ClientsPaged>({
        queryKey: ["clients", page, name],
        queryFn: async () => await clientService.findAllPaged(page, name),
        placeholderData: keepPreviousData
    })
}