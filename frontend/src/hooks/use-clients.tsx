import { useQuery } from "@tanstack/react-query";
import * as clientService from '../services/client-service';


export default function (page: number, name: string) {
    return useQuery({
        queryKey: ["clients", page, name],
        queryFn: () => clientService.findAllPaged(page, name)
    })
}