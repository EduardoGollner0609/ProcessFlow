package com.gollner.processflow.dto.auth.request;

public record RegisterRequestDTO(String name, String document, String email, String password, String phone) {
}
