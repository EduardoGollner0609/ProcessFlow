import { useQuery } from "@tanstack/react-query";
import * as processService from '../../services/process-service';
import { ProcessDTO } from "../../models/process";

export default function UseProcessById(id: string) {
    return useQuery<ProcessDTO>({
        queryKey: ['process', id],
        queryFn: async () => processService.findById(id),
        enabled: !!id
    })
}