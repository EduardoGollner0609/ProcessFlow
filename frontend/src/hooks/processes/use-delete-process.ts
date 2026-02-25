import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as processService from '../../services/process-service';

export default function UseDeleteProcess() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => processService.deleteProcess(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processes'] })
        }
    })
}