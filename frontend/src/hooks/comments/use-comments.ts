import { useQuery } from "@tanstack/react-query";
import * as commentService from '../../services/comment-service';
import { CommentDTO } from "../../models/comment";

export function UseComments(processId: string) {
    return useQuery<CommentDTO[]>({
        queryKey: ['comments', processId],
        queryFn: async () => commentService.findAllByProcess(processId),
        enabled: !!processId,
        initialData: []
    })
}