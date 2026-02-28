import { useQuery } from "@tanstack/react-query";
import * as taskService from '../../services/task-services';
import { TaskDTO } from "../../models/task";

export function UseTasks(processId: string) {
    return useQuery<TaskDTO[]>({
        queryKey: ['tasks', processId],
        queryFn: async () => taskService.findAllByProcess(processId),
        enabled: !!processId,
        initialData: []
    })
}