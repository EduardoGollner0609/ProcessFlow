import { useQuery } from "@tanstack/react-query";
import * as taskService from '../../services/task-services';

export function UseTasks(processId: string) {
    return useQuery({
        queryKey: ['tasks', processId],
        queryFn: async () => taskService.findAllByProcess(processId),
        enabled: !!processId,
        initialData: []
    })
}