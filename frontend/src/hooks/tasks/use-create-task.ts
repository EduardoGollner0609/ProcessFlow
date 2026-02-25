import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as taskService from '../../services/task-services';
import { TaskRequestDTO } from "../../models/task";

export default function UseCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskRequest: TaskRequestDTO) => taskService.insert(taskRequest),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.processId] });
        }
    })
}