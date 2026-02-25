import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as processService from '../../services/process-service';
import { useNavigate } from "react-router-dom";
import { ProcessMinDTO, ProcessRequestDTO } from "../../models/process";

export default function UseCreateProcess() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (process: ProcessRequestDTO) => processService.insert(process),
        onSuccess: (data: ProcessMinDTO) => {
            queryClient.invalidateQueries({ queryKey: ['processes'] })
            navigate(`/dashboard/process/${data.id}`);
        }
    })
}