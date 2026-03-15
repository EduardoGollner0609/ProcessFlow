import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as commentService from '../../services/comment-service';

export default function UseDeleteComment() {
        const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => commentService.deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    })
}