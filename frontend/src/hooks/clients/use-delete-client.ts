import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientService from '../../services/client-service'
import toast from "react-hot-toast";

export default function UseDeleteClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => clientService.deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] })
        },
        onError: () => {
            toast.error("Erro ao deletar cliente")
        }
    })
}