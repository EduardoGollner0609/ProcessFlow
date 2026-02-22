package com.gollner.processflow.dto.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(@NotBlank(message = "Campo requerido")
                                 @Pattern(regexp = "^[\\p{L} ]+$", message = "Nome deve conter apenas letras")
                                 String name,
                                 @NotBlank(message = "Campo requerido")
                                 @Size(min = 11, max = 14, message = "Documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos")
                                 @Pattern(regexp = "^\\d+$", message = "Documento deve conter apenas números")
                                 String document,
                                 @NotBlank(message = "Campo requerido")
                                 @Email(message = "Email inválido")
                                 String email,
                                 @NotBlank(message = "Campo requerido")
                                 @Size(min = 8, max = 18, message = "Senha deve ter entre 6 e 18 caracteres")
                                 String password,
                                 @NotBlank(message = "Campo requerido")
                                 @Pattern(regexp = "^\\d+$", message = "Telefone deve conter apenas números")
                                 String phone) {
}
