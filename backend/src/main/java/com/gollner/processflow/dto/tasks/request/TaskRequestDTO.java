package com.gollner.processflow.dto.tasks.request;

import java.time.Instant;
import java.util.UUID;

public record TaskRequestDTO(String title,
                             String description,
                             String status,
                             Instant dueDate,
                             UUID processId) {
}
