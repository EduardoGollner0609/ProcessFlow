import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as processService from '../../services/process-service'
import toast from "react-hot-toast";
import { ProcessRequestDTO } from "../../models/process";

type UseUpdateProcessProps = { id: string; process: ProcessRequestDTO };

export default function UseUpdateProcess() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, process }: UseUpdateProcessProps) => processService.update(id, process),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["processes"] });
            queryClient.invalidateQueries({ queryKey: ["process", variables.id] });
        },
        onError: () => {
            toast.error("Erro ao atualizar processo")
        }
    })
}