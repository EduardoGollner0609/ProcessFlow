package com.gollner.processflow.dto.tasks.request;

import java.time.Instant;
import java.util.UUID;

public record TaskRequestDTO(String title,
                             String description,
                             Instant dueDate,
                             UUID processId) {
}
