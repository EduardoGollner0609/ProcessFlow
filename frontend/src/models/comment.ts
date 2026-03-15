export type CommentDTO = {
    id: string;
    content: string;
    createMoment: string
}

export type CommentRequestDTO = {
    content: string;
    processId: string;
}