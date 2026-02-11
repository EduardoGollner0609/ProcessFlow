package com.gollner.processflow.dto;

import com.gollner.processflow.entities.Client;

import java.util.UUID;

public record ClientMinDTO(UUID id,
                           String name,
                           String document,
                           String email,
                           String phone) {

    public ClientMinDTO(Client client) {
        this(client.getId(),
                client.getName(),
                client.getDocument(),
                client.getEmail(),
                client.getPhone());
    }
}
