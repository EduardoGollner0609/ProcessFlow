package com.gollner.processflow.dto.processes.request;

import java.time.Instant;
import java.util.UUID;

public record ProcessRequestDTO(String title, String description, Instant dueDate, UUID clientId) {
}
