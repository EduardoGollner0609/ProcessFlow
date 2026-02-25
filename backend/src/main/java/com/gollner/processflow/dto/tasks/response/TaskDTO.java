package com.gollner.processflow.dto.tasks.response;

import com.gollner.processflow.entities.Task;
import com.gollner.processflow.enums.TaskStatus;

import java.time.Instant;
import java.util.UUID;

public record TaskDTO(UUID id,
                      String title,
                      String description,
                      TaskStatus status,
                      Instant createMoment,
                      Instant dueDate) {

    public TaskDTO(Task task) {
        this(task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreateMoment(),
                task.getDueDate());
    }
}
