import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientService from '../../services/client-service'
import toast from "react-hot-toast";
import { ClientRequestDTO } from "../../models/client";

type UseUpdateClientProps = { id: string; client: ClientRequestDTO };

export default function UseUpdateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, client }: UseUpdateClientProps) => clientService.update(id, client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] })
        },
        onError: () => {
            toast.error("Erro ao atualizar cliente")
        }
    })
}