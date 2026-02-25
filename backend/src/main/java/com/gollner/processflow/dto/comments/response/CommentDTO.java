package com.gollner.processflow.dto.comments.response;

import com.gollner.processflow.entities.Comment;

import java.time.Instant;
import java.util.UUID;

public record CommentDTO(UUID id,
                         String content,
                         Instant createMoment) {

    public CommentDTO(Comment comment) {
        this(comment.getId(),
                comment.getContent(),
                comment.getCreateMoment());
    }
}
