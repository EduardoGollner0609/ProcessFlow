package com.gollner.processflow.dto.processes.response;

import com.gollner.processflow.dto.clients.response.ClientMinDTO;
import com.gollner.processflow.dto.comments.response.CommentDTO;
import com.gollner.processflow.dto.tasks.response.TaskDTO;
import com.gollner.processflow.entities.Comment;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.entities.Task;
import com.gollner.processflow.enums.ProcessStatus;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record ProcessDTO(UUID id,
                         String title,
                         String description,
                         ProcessStatus status,
                         Instant createMoment,
                         Instant dueDate,
                         ClientMinDTO client,
                         List<CommentDTO> comments,
                         List<TaskDTO> tasks,
                         Set<String> filesUrl) {

    public ProcessDTO(Process process, List<CommentDTO> comments, List<TaskDTO> tasks, Set<String> filesUrl) {
        this(process.getId(),
                process.getTitle(),
                process.getDescription(),
                process.getStatus(),
                process.getCreateMoment(),
                process.getDueDate(),
                new ClientMinDTO(
                        process.getClient().getId(),
                        process.getClient().getName(),
                        process.getClient().getDocument(),
                        process.getClient().getEmail(),
                        process.getClient().getPhone()),
                comments,
                tasks,
                filesUrl);
    }
}
