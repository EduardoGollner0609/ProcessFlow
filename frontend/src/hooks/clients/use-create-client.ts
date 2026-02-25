import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientRequestDTO } from "../../models/client";
import * as clientService from '../../services/client-service'

export default function UseCreateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (client: ClientRequestDTO) => clientService.insert(client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] })
        }
    })
}