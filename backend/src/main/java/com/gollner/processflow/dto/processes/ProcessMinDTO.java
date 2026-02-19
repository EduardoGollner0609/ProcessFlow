package com.gollner.processflow.dto.processes;

import com.gollner.processflow.dto.clients.ClientMinDTO;
import com.gollner.processflow.entities.Process;
import com.gollner.processflow.enums.ProcessStatus;

import java.time.Instant;
import java.util.UUID;

public record ProcessMinDTO(UUID id,
                            String title,
                            String description,
                            ProcessStatus status,
                            Instant createMoment,
                            Instant dueDate,
                            ClientMinDTO client) {

    public ProcessMinDTO(Process process) {
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
                        process.getClient().getPhone()));
    }
}
