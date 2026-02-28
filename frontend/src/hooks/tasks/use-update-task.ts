import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskRequestDTO } from "../../models/task";
import * as taskService from '../../services/task-services';

interface UseUpdateTaskProps {
    id: string;
    task: TaskRequestDTO
}
export default function UseUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, task }: UseUpdateTaskProps) => taskService.update(id, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    })
}