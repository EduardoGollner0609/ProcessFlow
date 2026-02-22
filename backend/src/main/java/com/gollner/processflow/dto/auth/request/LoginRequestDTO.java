package com.gollner.processflow.dto.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank(message = "Campo requerido")
        @Email(message = "Email inválido")
        String email,
        @NotBlank(message = "Campo requerido")
        String password) {
}
