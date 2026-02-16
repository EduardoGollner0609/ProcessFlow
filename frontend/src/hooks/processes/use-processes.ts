import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Paged } from "../../models/generics";
import { ProcessMinDTO } from "../../models/process";
import * as processService from '../../services/process-service';

export default function useProcess(page: number, title: string) {
    return useQuery<Paged<ProcessMinDTO[]>>({
        queryKey: ['get-processes', page, title],
        queryFn: async () => processService.findAllByTitle(page, title),
        placeholderData: keepPreviousData
    })
}