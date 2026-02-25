import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as clientService from '../../services/client-service';
import { ClientMinDTO } from "../../models/client";
import { Paged } from "../../models/generics";

export default function useClients(page: number, name: string) {
    return useQuery<Paged<ClientMinDTO[]>>({
        queryKey: ["clients", page, name],
        queryFn: async () => await clientService.findAllPaged(page, name),
        placeholderData: keepPreviousData
    })
}