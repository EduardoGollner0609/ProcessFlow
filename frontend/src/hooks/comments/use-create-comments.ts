import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as commentService from '../../services/comment-service';
import { CommentRequestDTO } from "../../models/comment";

export default function UseCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(commentRequest: CommentRequestDTO) => commentService.insert(commentRequest),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.processId] });
        }
    })
}